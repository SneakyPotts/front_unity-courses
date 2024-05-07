import classNames from 'classnames'
import React from 'react'

import { TestWrapper } from '@components/Test'

import type { TextAnswerProps } from '../CheckTestWorkContent.props'

export function TextAnswer({ answer_type, question, text, indexNumber }: TextAnswerProps) {
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
