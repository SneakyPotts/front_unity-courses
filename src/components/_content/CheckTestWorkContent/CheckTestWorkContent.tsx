'use client'

import { format } from 'date-fns'
import React, { Fragment, useState } from 'react'

import { MarkSelect } from '@components/MarkSelect'
import { Single, descMatcher } from '@components/Test'
import { useSetHeaderParams } from '@hooks/useSetHeaderParams'
import { revalidateTestWork } from '@http/teacher/actions'
import { useQueryTeacherLesson } from '@http/teacher/client.lesson'

import { Button } from '_ui/Button'
import { toastPromise } from '_ui/ToastUtils'

import { NotStrictComplianceAnswer } from '_content/CheckTestWorkContent/components/NotStrictComplianceAnswer'

import type { CheckTestWorkContentProps } from './CheckTestWorkContent.props'
import { StrictComplianceAnswer } from './components/StrictComplianceAnswer'
import { TextAnswer } from './components/TextAnswer'

export function CheckTestWorkContent({ data }: CheckTestWorkContentProps) {
  const { testMark, retakeTest } = useQueryTeacherLesson({})

  const [mark, setMark] = useState(data.mark || data.quiz?.estimate_mark || 0)
  const [isEditing, setIsEditing] = useState(!data.mark)

  const handleAllowRetake = () => {
    toastPromise({
      handler: retakeTest({ test_id: data.test_id!, student_id: data.student.id }),
      successCallback: () => revalidateTestWork(),
      successMessage: 'Надано дозвіл на перевиконання',
    })
  }

  const handleSetMark = () => {
    toastPromise({
      handler: testMark({ test_id: data.test_id!, user_id: data.student.id, mark }),
      successCallback: () => {
        revalidateTestWork()
        setIsEditing(false)
      },
      successMessage: 'Оцінка успішно збережена',
    })
  }

  useSetHeaderParams({ title: 'Тестова робота' })

  return (
    <div className={'lesson-section__block'}>
      {data?.deadline && <div className={'lesson-section__deadline'}>{format(new Date(data.deadline), 'dd.MM.yy HH:mm')}</div>}

      {data?.status === 2 ? (
        <div className="tests__retake">
          <p>Учню відправлено завдання на перездачу. Очікуйте на сповіщення про виконання роботи.</p>
        </div>
      ) : (
        <div className="tests">
          <div className="tests__inner">
            <h2 className="tests__title">Студент Шевченко Іван</h2>
            {data?.quiz?.result.map((answer, index) => (
              <Fragment key={answer.question_id}>
                {(answer.answer_type === 1 || answer.answer_type === 2) && (
                  <Single
                    variant="answer"
                    type={answer.answer_type === 1 ? 'radio' : 'checkbox'}
                    id={answer.question_id}
                    question={answer.question}
                    description={descMatcher[answer.answer_type]}
                    options={answer.options}
                    indexNumber={index + 1}
                  />
                )}
                {answer.answer_type === 3 && (
                  <StrictComplianceAnswer
                    key={`${answer.question}_${index}`}
                    indexNumber={index + 1}
                    {...answer}
                  />
                )}
                {answer.answer_type === 4 && (
                  <NotStrictComplianceAnswer
                    key={`${answer.question}_${index}`}
                    indexNumber={index + 1}
                    {...answer}
                  />
                )}
                {answer.answer_type === 5 && (
                  <TextAnswer
                    key={`${answer.question}_${index}`}
                    indexNumber={index + 1}
                    {...answer}
                    text={[answer.correct_sentence, answer.student_sentence]}
                  />
                )}
                {answer.answer_type === 6 && (
                  <TextAnswer
                    key={`${answer.question}_${index}`}
                    indexNumber={index + 1}
                    {...answer}
                    text={[answer.answer]}
                  />
                )}
              </Fragment>
            ))}
          </div>
          <div className="tests__result">
            <div className="tests__mark">
              <span className="tests__mark-caption">Загальна оцінка за тест</span>
              {isEditing ? (
                <MarkSelect
                  value={mark}
                  setValue={setMark}
                />
              ) : (
                <div className="dropdawn__button --no-handler">
                  <span className="dropdawn__button-value">{mark}</span>
                </div>
              )}
            </div>
            {isEditing ? (
              <Button
                onClick={handleSetMark}
                // disabled={setMarkIsLoading}
              >
                Відправити учню
              </Button>
            ) : (
              <div className={'lesson-section__block__result-button'}>
                <Button
                  variant={'border'}
                  onClick={() => setIsEditing(true)}
                >
                  Змінити рішення
                </Button>
                <Button
                  variant={'border'}
                  onClick={handleAllowRetake}
                >
                  Дозволити перездати
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
