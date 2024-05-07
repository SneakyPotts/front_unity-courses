import classNames from 'classnames'
import React from 'react'

import Image from 'next/image'

import { TestWrapper } from '@components/Test'
import { ComplianceGridMatrix } from '@components/Test/ComplianceGridMatrix'

import type { StrictComplianceAnswerProps } from '../CheckTestWorkContent.props'

export function StrictComplianceAnswer({ answer_type, question_id, question, pairs, student_pairs, is_correct, indexNumber }: StrictComplianceAnswerProps) {
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
                  <Image
                    src={v.left_column.image_answer}
                    fill
                    sizes="10vw"
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
                  <Image
                    src={v.right_column.image_answer}
                    fill
                    sizes="10vw"
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
