'use client'

import { MathJax } from 'better-react-mathjax'
import { format } from 'date-fns'
import React, { Fragment, useState } from 'react'

import dynamic from 'next/dynamic'

import { dynamicOptions } from '@assets/constants'
import { MarkSelect } from '@components/MarkSelect'
import { Single, descMatcher } from '@components/Test'
import { UploadDocumentItem } from '@components/UploadDocument'
import { useSetHeaderParams } from '@hooks/useSetHeaderParams'
import { revalidateExamCheckInfo } from '@http/teacher/actions'
import { useQueryTeacherExam } from '@http/teacher/client.exam'

import { Button } from '_ui/Button'
import { Dropdown } from '_ui/Dropdown'
import { toastPromise } from '_ui/ToastUtils'

import { NotStrictComplianceAnswer, StrictComplianceAnswer, TextAnswer } from '_content/CheckTestWorkContent'

import type { CheckExamContentProps } from './CheckExamContent.props'

const TextEditor = dynamic(() => import('@components/TextEditor').then((mod) => mod.TextEditor), {
  ...dynamicOptions,
  ssr: false,
})

const marks = Array.from({ length: 13 }, (_, i) => i)

export function CheckExamContent({ exam }: CheckExamContentProps) {
  const { setMark: setExamMark, allowRetake: allowRetakeExam } = useQueryTeacherExam()

  const [mark, setMark] = useState(exam.mark || exam.quiz?.estimate_mark || 0)
  const [text, setText] = useState(exam.teacher_reply || undefined)
  const [isEditing, setIsEditing] = useState(exam.mark === null)

  const handleAllowRetake = () => {
    toastPromise({
      handler: allowRetakeExam({ exam_id: exam.test_id, student_id: exam.student.id }),
      successCallback: () => revalidateExamCheckInfo(),
      successMessage: 'Надано дозвіл на перевиконання',
    })
  }

  const handleSetMark = () => {
    toastPromise({
      handler: setExamMark({ exam_id: exam.test_id, user_id: exam.student.id, mark, reply: text }),
      successCallback: () => {
        revalidateExamCheckInfo()
        setIsEditing(false)
      },
      successMessage: 'Оцінка успішно збережена',
    })
  }

  useSetHeaderParams({ title: `Контрольна робота - ${exam.student.last_name} ${exam.student.first_name}` })

  if (exam.test_type === 'INT')
    return (
      <div className={'lesson-section__block'}>
        {exam.deadline && <div className={'lesson-section__deadline'}>{format(new Date(exam.deadline), 'dd.MM.yy HH:mm')}</div>}

        {exam.status === 2 ? (
          <div className="tests__retake">
            <p>Учню відправлено завдання на перездачу. Очікуйте на сповіщення про виконання роботи.</p>
          </div>
        ) : (
          <div className="tests">
            <div className="tests__inner">
              <h2 className="tests__title">
                {exam.student.last_name} {exam.student.first_name}
              </h2>
              {exam.quiz?.result.map((answer, index) => (
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

  return (
    <div className={'lesson-section__block'}>
      {Number(exam.progress_type) !== 2 && <div className={'lesson-section__deadline'}>{format(new Date(exam.answer_timestamp), 'dd.MM.yyyy HH:mm')}</div>}

      {exam.status === 2 ? (
        <div className="tests__retake">
          <p>Учню відправлено завдання на перездачу. Очікуйте на сповіщення про виконання роботи.</p>
        </div>
      ) : (
        <>
          <div className="lesson-section__info">
            <div className="lesson-section__text">
              <div className="text-wrapp">
                <h2>{`${exam.student.last_name} ${exam.student.first_name}`}</h2>
                {Number(exam.progress_type) === 1 && (
                  <MathJax>
                    <div dangerouslySetInnerHTML={{ __html: exam.student.test_progress.answer || '' }} />
                  </MathJax>
                )}

                {/*{exam.progress_type === 2 && !!exam.files?.length && <FilesList data={exam.files} />}*/}
                {Number(exam.progress_type) === 2 && !!exam.student.test_progress?.files.length && (
                  <div className="lesson-section__document-block document-block">
                    <ul className="document-block__list w-full">
                      {exam.student.test_progress.files.map((v) => (
                        <UploadDocumentItem
                          key={v.id}
                          name={v.file}
                          link={v.file}
                          type="download"
                        />
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lesson-section__section-block">
            <h2 className="lesson-section__title">Перевірка знань</h2>
            <div className="lesson-section__grade">
              <p>Оцінка{!isEditing && <span className={'lesson-section__box-input'}>{mark}</span>}</p>

              {isEditing && (
                <Dropdown
                  valuesList={marks}
                  value={mark}
                  onChange={(val) => setMark(Number(val))}
                />
              )}
            </div>
          </div>
          <p className="lesson-section__block-text">Коментар до роботи</p>
          <div className="lesson-section__case">
            {isEditing ? (
              <TextEditor
                version={4}
                initData={text || ''}
                onChange={setText}
              />
            ) : (
              <MathJax>
                <div dangerouslySetInnerHTML={{ __html: exam.teacher_reply || '' }} />
              </MathJax>
            )}

            {isEditing ? (
              <div className={'lesson-section__block__result-button'}>
                <Button onClick={handleSetMark}>
                  <svg className={'btn__icon'}>
                    <use href="/img/sprite.svg#home"></use>
                  </svg>
                  Відправити учню
                </Button>
                {exam.mark && (
                  <Button
                    variant={'border'}
                    onClick={() => setIsEditing(false)}
                  >
                    Скасувати
                  </Button>
                )}
              </div>
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
        </>
      )}
    </div>
  )
}
