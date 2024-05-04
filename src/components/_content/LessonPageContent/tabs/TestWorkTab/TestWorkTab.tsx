import { addMinutes, differenceInSeconds, format, isAfter } from 'date-fns'
import React, { useLayoutEffect, useState } from 'react'

import { TestsList } from '@components/TestsList'
import { useQueryStudentLesson } from '@http/student/client.lesson'

import { Button } from '_ui/Button'
import { Loader } from '_ui/Loader'
import { RequestError } from '_ui/RequestError'

import type { TestWorkTabProps } from './TestWorkTab.props'

export function TestWorkTab({ testId }: TestWorkTabProps) {
  const {
    test: { data: test, isLoading, isError },
    confirmTest,
  } = useQueryStudentLesson({ test_id: testId })

  const [isEditing, setIsEditing] = useState(false)

  const SendAnswerBtn = () => {
    const [timer, setTimer] = useState('')

    useLayoutEffect(() => {
      const updateTimer = () => {
        if (test?.progress?.answer_timestamp) {
          const answerTimestamp = new Date(test.progress.answer_timestamp)
          const timeForEdit = addMinutes(answerTimestamp, 15)

          if (isAfter(timeForEdit, new Date())) {
            const diffInSeconds = differenceInSeconds(timeForEdit, new Date())
            const minutes = Math.floor(diffInSeconds / 60)
            const seconds = diffInSeconds % 60
            // форматуємо час, щоб він завжди був у форматі MM:SS
            setTimer(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`)
          } else {
            setTimer('00:00')
          }
        }
      }

      updateTimer()

      const interval = setInterval(updateTimer, 1000)

      return () => clearInterval(interval)
    }, [])

    return (
      <div className="lesson-section__edit">
        {timer && (
          <>
            {timer !== '00:00' && (
              <Button onClick={() => setIsEditing(true)}>
                <svg className="btn__icon">
                  <use href={`/img/sprite.svg#pensil`}></use>
                </svg>
                Змінити відповідь
              </Button>
            )}
            <span className="lesson-section__change-timer">{timer === '00:00' ? `(закінчився час на редагування)` : `(залишилось ${timer})`}</span>
          </>
        )}
      </div>
    )
  }

  if (isLoading) return <Loader />

  if (isError) return <RequestError message="Щось пішло не так..." />

  return (
    <div className="lesson-section__block">
      {test?.deadline && (
        <div className="lesson-section__deadline">
          Дедлайн:
          <div className="lesson-section__date date date--blue">{format(new Date(test?.deadline), 'dd.MM H:mm')}</div>
        </div>
      )}

      {test?.quiz &&
        (!test?.progress?.is_completed || isEditing ? (
          <TestsList
            {...test.quiz}
            test_id={testId!}
            content={test?.content}
            setNotEditing={() => setIsEditing(false)}
          />
        ) : (
          <div className="lesson-section__case">
            <Button variant="gray">
              <svg className="btn__icon">
                <use href="/img/sprite.svg#check"></use>
              </svg>
              Тест пройшов (-ла)
            </Button>

            {!test?.progress.mark && <SendAnswerBtn />}
          </div>
        ))}

      {!test?.quiz && (
        <>
          <div className="lesson-section__section">
            <div className="lesson-section__text">
              <h2>Пройдіть тест</h2>
            </div>

            <div className="lesson-section__case">
              <Button
                variant={'border'}
                href={test?.external_link}
                target="_blank"
              >
                <svg className="btn__icon">
                  <use href="/img/sprite.svg#pen"></use>
                </svg>
                Перейти до тесту
              </Button>
            </div>
          </div>
          <div className="lesson-section__section">
            <div className="lesson-section__text">
              <h2>Моя робота</h2>
            </div>

            <div className="lesson-section__case">
              <Button
                variant={test?.progress?.is_completed ? 'gray' : 'accent'}
                onClick={() => confirmTest({ test_id: testId! })}
              >
                <svg className="btn__icon">
                  <use href="/img/sprite.svg#check"></use>
                </svg>
                Тест пройшов (-ла)
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
