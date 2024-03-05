'use client'

import { MathJax } from 'better-react-mathjax'
import { addMinutes, differenceInSeconds, format, isAfter, parseISO } from 'date-fns'
import React, { useLayoutEffect, useState } from 'react'

import { LessonsNavigation } from '@components/LessonsNavigation'
import { TestsList } from '@components/TestsList'
import { TextEditor } from '@components/TextEditor'
import { UploadDocumentItem, UploadDocumentModal } from '@components/UploadDocument'
import { useAssemblyContent } from '@hooks/useAssemblyContent'
import { useSetHeaderParams } from '@hooks/useSetHeaderParams'
import { useQueryStudentLesson } from '@http/courses/client'

import { Button } from '_ui/Button'
import { Loader } from '_ui/Loader'
import { RequestError } from '_ui/RequestError'
import { Tabs } from '_ui/Tabs'

import { IndividualWordProps, LessonPageContentProps, LessonSelfWorkContentProps, TestWorkTabProps } from './LessonPageContent.props'

export function LessonPageContent({ data }: LessonPageContentProps) {
  const { visit } = useQueryStudentLesson({})

  const tabs = ['Конспект', 'Контрольна  робота', 'Самостійна робота', 'Тест']

  const formattedContent = useAssemblyContent(data?.content)

  const [activeTab, setActiveTab] = useState(1)
  const [isShowSubjectNav, setIsShowSubjectNav] = useState(false)

  const handleVisitLesson = () => {
    data?.id && visit({ lesson_id: data.id })
    window.open(data?.online_lesson_link, '_blank')?.focus()
  }

  useSetHeaderParams({
    title: `Урок з ${data?.course_title}`,
    titleBefore: (
      <button
        className="header__manual"
        onClick={() => setIsShowSubjectNav((p) => !p)}
      >
        <svg className="header__manual-svg">
          <use href="/img/sprite.svg#list"></use>
        </svg>
      </button>
    ),
    titleAfter:
      data?.online_lesson_link &&
      (() => {
        const isEnded = isAfter(new Date(), addMinutes(new Date(data.start_time), 45))

        return (
          <Button
            variant={isEnded ? 'gray' : 'accent'}
            onClick={handleVisitLesson}
          >
            <svg className="btn__icon">
              <use href="/img/sprite.svg#check"></use>
            </svg>
            {isEnded ? `Урок ${data.is_visited ? 'пройшов' : 'пропущено'}` : 'Посилання на онлайн урок'}
          </Button>
        )
      })(),
  })

  return (
    <>
      <Tabs
        className={'add-here-some-className-Artem'}
        list={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSmall
      />
      {activeTab === 1 && (
        <div className={'courses-lesson__body'}>
          <div className="lesson-section__text">{formattedContent}</div>
        </div>
      )}
      {activeTab === 2 && (
        <>
          <h1>ControlWorkTab</h1>
        </>
      )}
      {activeTab === 3 && data?.self_education_work && <SelfWorkTab selfId={data?.self_education_work} />}
      {activeTab === 4 && data?.test && <TestWorkTab testId={data.test} />}

      {isShowSubjectNav && data?.course_id && (
        <LessonsNavigation
          courseId={data.course_id!}
          onClose={() => setIsShowSubjectNav(false)}
        />
      )}
    </>
  )
}

function SelfWorkTab({ selfId }: IndividualWordProps) {
  const {
    self: { data, isLoading, isError },
  } = useQueryStudentLesson({ self_id: selfId })

  if (isLoading) return <Loader />

  if (isError) return <RequestError message="Щось пішло не так..." />

  return (
    <>
      <div className="lesson-section__block">
        {data?.deadline && (
          <div className="lesson-section__deadline">
            Дедлайн:
            <div className="lesson-section__date date date--blue">{format(new Date(data.deadline), 'dd.MM H:mm')}</div>
          </div>
        )}
        <div className="lesson-section__info">
          <div className="lesson-section__text">
            <div className="text-wrapp">
              {!!data?.title?.length && <h2>{data?.title}</h2>}
              <MathJax>
                <div dangerouslySetInnerHTML={{ __html: data?.content || '' }} />
              </MathJax>
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

        <SelfWorkContent
          selfWork={data}
          // marks={lesson?.marks}
        />
      </div>
    </>
  )
}

function SelfWorkContent({ selfWork }: LessonSelfWorkContentProps) {
  const [text, setText] = useState<string>(selfWork?.progress?.student_answer || '')
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const isUpload = !selfWork?.progress?.block_timestamp || isEditing
  // const hwMark = marks?.find((i) => i.mark_type === 34)?.mark

  const { sendTextSelfWork, sendFileSelfWork, deleteFileSelfWork, sendSelfConfirm } = useQueryStudentLesson({})

  const onSubmit = async () => {
    setError('')

    if (selfWork?.progress_type === 1) {
      if (!isUpload) {
        setIsEditing(true)
      } else {
        if (!text?.length) {
          setError("Це обов'язкове поле")
          return
        }
        try {
          await sendTextSelfWork({ self_id: selfWork.id, student_answer: text })
          await sendSelfConfirm({ self_id: selfWork.id })
          setIsEditing(false)
        } catch (err) {
          setError('Щось пішло не так')
        }
      }
    } else if (selfWork?.progress_type === 2) {
      setIsOpen(true)
    }
  }

  const SubmitBtn = () => {
    const [timer, setTimer] = useState('')

    const submitTitle = selfWork?.progress_type === 1 ? 'Відправити роботу' : 'Завантажити роботу'

    useLayoutEffect(() => {
      const updateTimer = () => {
        if (selfWork?.progress?.block_timestamp) {
          // const timeForEdit = moment(new Date(timestamp)).add(15, 'm')
          const timeForEdit = parseISO(selfWork?.progress?.block_timestamp)
          const difference = differenceInSeconds(timeForEdit, new Date())

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
            {/*{timer === '00:00' ? (!selfWork?.teacher_reply ? '(закінчився час на редагування)' : null) : `(залишилось ${timer})`}*/}
            {timer === '00:00' ? '(закінчився час на редагування)' : `(залишилось ${timer})`}
          </span>
        )}
      </div>
    )
  }

  return (
    <div className="lesson-section__section">
      <h2 className="lesson-section__title">Моя домашня робота</h2>

      {/* Поле для ввода */}
      {selfWork?.progress_type === 1 && (
        <div className="lesson-section__case">
          {isUpload ? (
            <TextEditor
              version={4}
              initData={text}
              onChange={setText}
            />
          ) : (
            <MathJax>
              <div dangerouslySetInnerHTML={{ __html: selfWork.progress.student_answer || '' }} />
            </MathJax>
          )}

          {error && <p className="error">{error}</p>}

          <SubmitBtn />
        </div>
      )}

      {/* Загрузка файлов */}
      {selfWork?.progress_type === 2 && (
        <div className="lesson-section__case">
          {!!selfWork?.progress?.files?.length && (
            <div className={'lesson-section__document-block document-block'}>
              <ul className="document-block__list w-full">
                {selfWork?.progress?.files?.map((i) => (
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
              docList={selfWork?.progress?.files}
              onClose={() => setIsOpen(false)}
              handleUpload={(data) => sendFileSelfWork({ self_id: selfWork.id, body: data })}
              handleRemoveItem={(id) => deleteFileSelfWork({ self_id: selfWork.id, file_id: id })}
              handleSubmit={() => sendSelfConfirm({ self_id: selfWork.id }).then(() => setIsOpen(false))}
            />
          )}
        </div>
      )}

      {/*/!* Teacher reply *!/*/}
      {/*{!!homework?.homework_progress?.teacher_reply && (*/}
      {/*  <div className="lesson-section__reply">*/}
      {/*    <div className="lesson-section__reply-flex">*/}
      {/*      <div className="lesson-section__reply-date">{moment(homework.homework_progress.teacher_reply_timestamp).format('DD.MM.YYYY H:mm')}</div>*/}
      {/*      {hwMark && (*/}
      {/*        <div className="lesson-section__reply-mark-wrapper">*/}
      {/*          <span className="lesson-section__reply-title">Оцінка:</span>*/}
      {/*          <span className="lesson-section__reply-mark">{hwMark}</span>*/}
      {/*        </div>*/}
      {/*      )}*/}
      {/*    </div>*/}
      {/*    <p className="lesson-section__reply-title">Коментар до роботи:</p>*/}
      {/*    <MathJax>*/}
      {/*      <div*/}
      {/*        className="lesson-section__reply-text"*/}
      {/*        dangerouslySetInnerHTML={{ __html: homework.homework_progress.teacher_reply }}*/}
      {/*      />*/}
      {/*    </MathJax>*/}
      {/*  </div>*/}
      {/*)}*/}
    </div>
  )
}

function TestWorkTab({ testId }: TestWorkTabProps) {
  const {
    test: { data: test, isLoading, isError },
  } = useQueryStudentLesson({ test_id: testId })

  const confirmTest = ({ id }: { id: string }) => {
    console.log('confirmTest', id)
  }

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
            test_id={testId}
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
                  <use xlinkHref="/img/sprite.svg#pen"></use>
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
                onClick={() => confirmTest({ id: testId })}
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
