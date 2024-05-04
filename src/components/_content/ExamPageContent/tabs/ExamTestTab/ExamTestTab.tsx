import { MathJax } from 'better-react-mathjax'
import { addMinutes, differenceInSeconds, format, parseISO } from 'date-fns'
import React, { useLayoutEffect, useState } from 'react'

import dynamic from 'next/dynamic'

import { dynamicOptions } from '@assets/constants'
import type { TDocument } from '@assets/types/globals'
import { UploadDocumentItem, UploadDocumentModal } from '@components/UploadDocument'
import { useAssemblyContent } from '@hooks/useAssemblyContent'
import { useQueryStudentExam } from '@http/student/client.exam.api'

import { Button } from '_ui/Button'

import type { ExamTestTabProps } from './ExamTestTab.props'

const TextEditor = dynamic(() => import('@components/TextEditor').then((mod) => mod.TextEditor), {
  ...dynamicOptions,
  ssr: false,
})

const TestsList = dynamic(() => import('@components/TestsList').then((mod) => mod.TestsList), {
  ...dynamicOptions,
  ssr: false,
})

export function ExamTestTab({ ...exam }: ExamTestTabProps) {
  const [text, setText] = useState<string>('')
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const isUpload = !exam.progress?.answer_timestamp || isEditing
  const formattedContent = useAssemblyContent(exam.content)

  const { sendTextExam, sendQuizExam, addFile, removeFile, confirmExam } = useQueryStudentExam()

  const onSubmit = async () => {
    setError('')

    if (exam.progress_type === 1) {
      if (!isUpload) {
        setIsEditing(true)
      } else {
        if (!text?.length) {
          setError("Це обов'язкове поле")
          return
        }
        try {
          await sendTextExam({ exam_id: exam.id, answer: text })
          await confirmExam({ exam_id: exam.id })
          setIsEditing(false)
        } catch (err) {
          setError('Щось пішло не так')
        }
      }
    } else if (exam?.progress_type === 2) {
      setIsOpen(true)
    }
  }

  const SubmitBtn = () => {
    const [timer, setTimer] = useState('')

    const submitTitle = exam.progress_type === 1 ? 'Відправити роботу' : 'Завантажити роботу'

    useLayoutEffect(() => {
      const updateTimer = () => {
        if (exam.progress?.answer_timestamp) {
          const timeForEdit = parseISO(exam.progress?.answer_timestamp)
          const difference = differenceInSeconds(addMinutes(timeForEdit, 15), new Date())

          if (difference > 0) {
            const minutes = Math.floor(difference / 60)
            const seconds = difference % 60

            const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

            setTimer(formattedTime)
          } else {
            setTimer('00:00')
          }
        }
      }

      updateTimer()

      const interval = setInterval(updateTimer, 1000)

      return () => clearInterval(interval)
    }, [])

    if (exam.test_type === 'INT') {
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
    } else {
      return (
        <div className="lesson-section__edit">
          {timer !== '00:00' && (
            <Button
              variant={isUpload ? 'accent' : 'border'}
              onClick={onSubmit}
              // disabled={textLoading || confirmLoading}
            >
              <svg className="btn__icon">
                <use href={`/img/sprite.svg#${isUpload ? 'home' : 'pensil'}`}></use>
              </svg>
              {isUpload ? submitTitle : 'Редагувати'}
            </Button>
          )}
          {!isUpload && timer && (
            <span className="lesson-section__change-timer">
              {timer === '00:00' ? (!exam.progress.teacher_reply ? '(закінчився час на редагування)' : null) : `(залишилось ${timer})`}
              {/*{timer === '00:00' ? '(закінчився час на редагування)' : `(залишилось ${timer})`}*/}
            </span>
          )}
        </div>
      )
    }
  }

  return (
    <div className="lesson-section__block">
      {exam.deadline && (
        <div className="lesson-section__deadline">
          Дедлайн:
          <div className="lesson-section__date date date--blue">{format(new Date(exam.deadline), 'dd.MM H:mm')}</div>
        </div>
      )}
      <div className="lesson-section__info">
        <div className="lesson-section__text">
          <div className="text-wrapp">
            <MathJax>{formattedContent}</MathJax>
          </div>
        </div>

        {/*{!!data?.files?.length && (*/}
        {/*  <div className="lesson-section__files">*/}
        {/*    <h2 className="lesson-section__title">Матеріали:</h2>*/}
        {/*    <div className="lesson-section__document-block document-block">*/}
        {/*      <ul className="document-block__list">*/}
        {/*        {data.files.map((i) => (*/}
        {/*          <UploadDocumentItem*/}
        {/*            key={i.id}*/}
        {/*            type="download"*/}
        {/*            name={i.name}*/}
        {/*            link={i.file}*/}
        {/*          />*/}
        {/*        ))}*/}
        {/*      </ul>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*)}*/}
      </div>

      {exam.test_type === 'TXT' && (
        <div className="lesson-section__section">
          <h2 className="lesson-section__title">Моя домашня робота</h2>

          {/* Поле для ввода */}
          {exam.progress_type === 1 && (
            <div className="lesson-section__case">
              {isUpload ? (
                <TextEditor
                  version={4}
                  initData={text}
                  onChange={setText}
                />
              ) : (
                <MathJax>
                  <div dangerouslySetInnerHTML={{ __html: exam.progress.answer || '' }} />
                </MathJax>
              )}

              {error && <p className="error">{error}</p>}

              <SubmitBtn />
            </div>
          )}

          {/* Загрузка файлов */}
          {exam.progress_type === 2 && (
            <div className="lesson-section__case">
              {!!exam.progress?.files?.length && (
                <div className={'lesson-section__document-block document-block'}>
                  <ul className="document-block__list w-full">
                    {exam.progress?.files?.map((i) => (
                      <UploadDocumentItem
                        key={i.id}
                        name={i.name}
                        link={i.file}
                        type="download"
                      />
                    ))}
                  </ul>
                </div>
              )}

              <SubmitBtn />

              {isOpen && (
                <UploadDocumentModal
                  docType={10}
                  docList={exam.progress?.files as TDocument[]}
                  onClose={() => setIsOpen(false)}
                  handleUpload={(body) => addFile({ exam_id: exam.id, body })}
                  handleRemoveItem={(id) => removeFile({ exam_id: exam.id, file_id: id })}
                  handleSubmit={() => confirmExam({ exam_id: exam.id }).then(() => setIsOpen(false))}
                />
              )}
            </div>
          )}

          {/* Teacher reply */}
          {!!exam.progress?.teacher_reply && (
            <div className="lesson-section__reply">
              <div className="lesson-section__reply-flex">
                <div className="lesson-section__reply-date">{format(new Date(exam.progress?.teacher_reply_timestamp), 'dd.MM.yyyy HH:mm')}</div>
                {exam.progress?.mark && (
                  <div className="lesson-section__reply-mark-wrapper">
                    <span className="lesson-section__reply-title">Оцінка:</span>
                    <span className="lesson-section__reply-mark">{exam.progress.mark}</span>
                  </div>
                )}
              </div>
              <p className="lesson-section__reply-title">Коментар до роботи:</p>
              <MathJax>
                <div
                  className="lesson-section__reply-text"
                  dangerouslySetInnerHTML={{ __html: exam.progress.teacher_reply }}
                />
              </MathJax>
            </div>
          )}
        </div>
      )}

      {exam.test_type === 'INT' &&
        (!exam?.progress?.is_completed || isEditing ? (
          <TestsList
            {...exam.quiz}
            test_id={exam.id}
            content={exam.content}
            setNotEditing={() => setIsEditing(false)}
            extraHandler={sendQuizExam}
          />
        ) : (
          <div className="lesson-section__case">
            <Button variant="gray">
              <svg className="btn__icon">
                <use href="/img/sprite.svg#check"></use>
              </svg>
              Тест пройшов (-ла)
            </Button>

            <SubmitBtn />
          </div>
        ))}

      {exam.test_type === 'EXT' && (
        <>
          <div className="lesson-section__section">
            <div className="lesson-section__text">
              <h2>Пройдіть тест</h2>
            </div>

            <div className="lesson-section__case">
              <Button
                variant={'border'}
                href={exam?.external_link}
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
                variant={exam.progress?.is_completed ? 'gray' : 'accent'}
                onClick={() => confirmExam({ exam_id: exam.id })}
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
