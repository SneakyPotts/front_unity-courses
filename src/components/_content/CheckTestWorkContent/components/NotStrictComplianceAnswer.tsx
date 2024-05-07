import classNames from 'classnames'
import React from 'react'

import { TestWrapper } from '@components/Test'
import { ComplianceGridMatrix } from '@components/Test/ComplianceGridMatrix'

import type { NotStrictComplianceAnswerProps } from '../CheckTestWorkContent.props'

export function NotStrictComplianceAnswer({ answer_type, question_id, question, left_column, right_column, is_correct, indexNumber }: NotStrictComplianceAnswerProps) {
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
