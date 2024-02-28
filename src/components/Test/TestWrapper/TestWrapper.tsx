import React from 'react'

import type { TestWrapperProps } from './TestWrapper.props'

export function TestWrapper({ indexNumber, question, description, children }: TestWrapperProps) {
  return (
    <div className="tests__block">
      <h3 className="tests__subtitle">Запитання {indexNumber}</h3>
      {!!question?.length && (
        <div
          className="tests__box"
          dangerouslySetInnerHTML={{
            __html: question,
          }}
        />
      )}
      <div className="tests__text">
        <p className="tests__task-caption">{description ?? 'Відповідь'}</p>

        {children}
      </div>
    </div>
  )
}
