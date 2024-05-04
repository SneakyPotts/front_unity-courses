import React from 'react'

import type { TStatsTypes } from '@http/student/types'

import type { StatisticSubjectItem, StatisticsItemProps } from './StatisticsItem.props'

const data: Record<TStatsTypes, StatisticSubjectItem> = {
  visiting: {
    title: 'Відвідуваність на курсах',
    icon: 'webcam',
  },
  mark: {
    title: 'Середня оцінка',
    icon: 'statistics',
  },
  progress: {
    title: 'Прогрес курсу',
    icon: 'book',
  },
  // lesson_average_estimate: {
  //   title: 'Середня оцінка за урок',
  //   icon: 'book',
  // },
  // homework_average_estimate: {
  //   title: 'Середня оцінка за Д/З',
  //   icon: 'home',
  // },
  // test_average_estimate: {
  //   title: 'Середня оцінка за К/Р',
  //   icon: 'warn',
  // },
  // self_test_average_estimate: {
  //   title: 'Середня оцінка за С/Р',
  //   icon: 'pen',
  // },
  // other_test_average_estimate: {
  //   title: 'Середня оцінка за Тести',
  //   icon: 'test',
  // },
}

export function StatisticsItem({ type, value, max_value, percentage, progress }: StatisticsItemProps) {
  return (
    <div className="statistics-block__item rating-block">
      <div className="rating-block__top">
        <h3 className="rating-block__title">{data[type]?.title || 'title'}</h3>
      </div>
      <div className="rating-block__bottom">
        <div className="rating-block__left">
          <svg className="rating-block__icon">
            <use href={`/img/sprite.svg#${data[type]?.icon || 'check'}`}></use>
          </svg>
        </div>
        <div className="rating-block__right">
          {progress === undefined ? (
            <>
              <span className="rating-block__mark">{Math.round(value)}</span>/{max_value ?? 0}
            </>
          ) : (
            <span className="rating-block__mark">{progress}%</span>
          )}
        </div>
      </div>
    </div>
  )
}
