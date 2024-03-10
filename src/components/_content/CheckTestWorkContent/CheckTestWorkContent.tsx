'use client'

import classNames from 'classnames'
import { format } from 'date-fns'
import React, { Fragment, useState } from 'react'

import { MarkSelect } from '@components/MarkSelect'
import { Single, TestWrapper, descMatcher } from '@components/Test'
import { ComplianceGridMatrix } from '@components/Test/ComplianceGridMatrix'
import { useSetHeaderParams } from '@hooks/useSetHeaderParams'
import { revalidateTestWork } from '@http/teacher/actions'
import { useQueryTeacherLesson } from '@http/teacher/client.lesson'

import { Button } from '_ui/Button'
import { toastPromise } from '_ui/ToastUtils'

import type { CheckTestWorkContentProps, NotStrictComplianceAnswerProps, StrictComplianceAnswerProps, TextAnswerProps } from './CheckTestWorkContent.props'

export function CheckTestWorkContent({ data }: CheckTestWorkContentProps) {
  const { testMark, retakeTest } = useQueryTeacherLesson({})

  const [mark, setMark] = useState(data.mark || data.quiz.estimate_mark || 0)
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

function TextAnswer({ answer_type, question, text, indexNumber }: TextAnswerProps) {
  return (
    <TestWrapper
      indexNumber={indexNumber}
      question={answer_type === 6 ? question : ''}
    >
      {text.map((v, i) => (
        <div
          key={`${v}${i}`}
          className="tests__info"
        >
          <div
            className={classNames('tests__info-text', { '--answer': !i })}
            dangerouslySetInnerHTML={{ __html: v }}
          />
        </div>
      ))}
    </TestWrapper>
  )
}

function StrictComplianceAnswer({ answer_type, question_id, question, pairs, student_pairs, is_correct, indexNumber }: StrictComplianceAnswerProps) {
  const imgLeft = pairs.every((v) => !!v.left_column.image_answer)
  const imgRight = pairs.every((v) => !!v.right_column.image_answer)

  const is = (i: number, j: number) => {
    const studentPairs = student_pairs.split('), (').map((pair) => pair.replace(/[()']/g, ''))

    const rightAnswer = pairs[i].right_column.id === pairs[j].right_column.id
    const studentAnswer = studentPairs.includes(`${pairs[i].left_column.id}, ${pairs[j].right_column.id}`)

    return { rightAnswer, studentAnswer, checked: rightAnswer || studentAnswer }
  }

  return (
    <TestWrapper
      indexNumber={indexNumber}
      question={question}
    >
      <div className="tests__content">
        <ol className={classNames('tests__scroll', { 'tests__alternative--element': imgLeft })}>
          {pairs.map((v, i) => (
            <li
              key={`${v.left_column.text_answer}_${i}`}
              className="tests__scroll-text"
            >
              {imgLeft ? (
                <div className="tests__alternative-photo">
                  <img
                    src={v.left_column.image_answer}
                    alt={question}
                  />
                </div>
              ) : (
                v.left_column.text_answer
              )}
            </li>
          ))}
        </ol>
        <ul className="tests__alternative">
          {pairs.map((v, i) => (
            <li
              key={`${v.right_column.text_answer}_${i}`}
              className="tests__alternative-text"
            >
              {imgRight ? (
                <div className="tests__alternative-photo">
                  <img
                    src={v.right_column.image_answer}
                    alt={question}
                  />
                </div>
              ) : (
                v.right_column.text_answer
              )}
            </li>
          ))}
        </ul>
      </div>

      <ComplianceGridMatrix
        cells={pairs.length}
        rows={pairs.length}
        checkedGetter={(...args) => is(...args).checked}
        answerCheckHandler={is}
      />
    </TestWrapper>
  )
}

function NotStrictComplianceAnswer({ answer_type, question_id, question, left_column, right_column, is_correct, indexNumber }: NotStrictComplianceAnswerProps) {
  const imgLeft = left_column.every((v) => !!v.image_answer)
  const imgRight = right_column.every((v) => !!v.image_answer)

  const is = (i: number, j: number) => {
    const rightAnswer = !!left_column[i].compliance_answers.find((v) => v.id === right_column[j].id)
    const studentAnswer = left_column[i].student_answer?.includes(right_column[j].id)

    return { rightAnswer, studentAnswer, checked: rightAnswer || studentAnswer }
  }

  return (
    <TestWrapper
      indexNumber={indexNumber}
      question={question}
    >
      <div className="tests__content">
        <ol className={classNames('tests__scroll', { 'tests__alternative--element': imgLeft })}>
          {left_column.map((v, i) => (
            <li
              key={`${v.text_answer}_${i}`}
              className="tests__scroll-text"
            >
              {imgLeft ? (
                <div className="tests__alternative-photo">
                  <img
                    src={v.image_answer}
                    alt={question}
                  />
                </div>
              ) : (
                v.text_answer
              )}
            </li>
          ))}
        </ol>
        <ul className="tests__alternative">
          {right_column.map((v, i) => (
            <li
              key={`${v.text_answer}_${i}`}
              className="tests__alternative-text"
            >
              {imgRight ? (
                <div className="tests__alternative-photo">
                  <img
                    src={v.image_answer}
                    alt={question}
                  />
                </div>
              ) : (
                v.text_answer
              )}
            </li>
          ))}
        </ul>
      </div>

      <ComplianceGridMatrix
        rows={left_column.length}
        cells={right_column.length}
        checkedGetter={(...args) => is(...args).checked}
        answerCheckHandler={is}
      />
    </TestWrapper>
  )
}
