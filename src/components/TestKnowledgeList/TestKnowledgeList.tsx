import React from 'react'

import { CustomLink } from '_ui/CustomLink'

import { TestKnowledgeItem } from './TestKnowledgeItem'
import type { WorkStatus, WorkType } from './TestKnowledgeItem/TestKnowledgeItem.props'
import type { TestKnowledgeListProps } from './TestKnowledgeList.props'

const testKnowledgeData = [
  {
    id: '1',
    subjectName: 'Математика',
    classroom: '7A',
    status: 'waiting',
    type: 'test',
    tasksCount: 20,
    tasksCheckedCount: 10,
  },
  {
    id: '2',
    subjectName: 'Математика',
    classroom: '5Б',
    status: 'checked',
    type: 'individual',
    tasksCount: 20,
    tasksCheckedCount: 10,
  },
  {
    id: '3',
    subjectName: 'Математика',
    classroom: '7A',
    status: 'waiting',
    type: 'test',
    tasksCount: 20,
    tasksCheckedCount: 10,
  },
  {
    id: '4',
    subjectName: 'Математика',
    classroom: '7A',
    status: 'waiting',
    type: 'test',
    tasksCount: 20,
    tasksCheckedCount: 10,
  },
  {
    id: '5',
    subjectName: 'Математика',
    classroom: '7A',
    status: 'waiting',
    type: 'test',
    tasksCount: 20,
    tasksCheckedCount: 10,
  },
  {
    id: '6',
    subjectName: 'Математика',
    classroom: '7A',
    status: 'waiting',
    type: 'test',
    tasksCount: 20,
    tasksCheckedCount: 10,
  },
]

export function TestKnowledgeList({ ...props }: TestKnowledgeListProps) {
  return (
    <div className={'test_knowledge'}>
      <div className="test_knowledge__header">
        <div className="test_knowledge__title">Перевірка знань</div>

        <CustomLink
          className={'test_knowledge__link'}
          href={'/teacher/test-knowledge'}
        >
          Всі роботи
          <svg>
            <use href="/img/sprite.svg#arrow-right"></use>
          </svg>
        </CustomLink>
      </div>
      <div className="test_knowledge__list">
        {testKnowledgeData.map((item) => (
          <TestKnowledgeItem
            {...item}
            key={item.id}
            minimal
            status={item.status as WorkStatus}
            type={item.type as WorkType}
          />
        ))}
      </div>
    </div>
  )
}
