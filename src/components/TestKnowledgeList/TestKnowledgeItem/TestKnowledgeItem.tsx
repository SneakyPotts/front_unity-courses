import classNames from 'classnames'
import React from 'react'

import type { TestKnowledgeItemProps, WorkStatus } from './TestKnowledgeItem.props'

export function TestKnowledgeItem({ className, subjectName, subjectTheme, type, status, classroom, minimal }: TestKnowledgeItemProps) {
  const statusWork: WorkStatus = status

  return (
    <div className={classNames('test-knowledge-item', className, { minimal })}>
      <div className="test-knowledge-item__info">
        <div className="test-knowledge-item__header">
          <div className="test-knowledge-item__type">{type}</div>
          <div className={classNames('test-knowledge-item__status', `test-knowledge-item__status_${status}`)}>{statusWork}</div>
        </div>

        <div className="test-knowledge-item__subject-name">
          {subjectName}, {classroom}
        </div>

        <div className="test-knowledge-item__subject-theme">Тема: {subjectTheme}</div>
      </div>
      <div className="test-knowledge-item__statistic">
        <div>
          Здано: 20/20 <span>100%</span>
        </div>
        <div>
          Перевірено: 20/20 <span>100%</span>
        </div>
      </div>
    </div>
  )
}
