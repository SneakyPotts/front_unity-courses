import React from 'react'

import { SubjectStatisticArrayItem } from '@assets/types/globals'

type StatisticSubjectItem = {
  title: string
  icon: string
}

const data: Record<string, StatisticSubjectItem> = {
  attendance: {
    title: 'Відвідуваність на онлайн уроках',
    icon: 'webcam',
  },
  forecast_estimate: {
    title: 'Прогнозована оцінка',
    icon: 'statistics',
  },
  lesson_average_estimate: {
    title: 'Середня оцінка за урок',
    icon: 'book',
  },
  homework_average_estimate: {
    title: 'Середня оцінка за Д/З',
    icon: 'home',
  },
  test_average_estimate: {
    title: 'Середня оцінка за К/Р',
    icon: 'warn',
  },
  self_test_average_estimate: {
    title: 'Середня оцінка за С/Р',
    icon: 'pen',
  },
  other_test_average_estimate: {
    title: 'Середня оцінка за Тести',
    icon: 'test',
  },
}

export function StatisticsItem({ type, value, max_value }: SubjectStatisticArrayItem) {
  return (
    <div className="statistics-block__item rating-block">
      <div className="rating-block__top">
        <h3 className="rating-block__title">{data[type]?.title || 'title'}</h3>
      </div>
      <div className="rating-block__bottom">
        <div className="rating-block__left">
          <svg className="rating-block__icon">
            <use xlinkHref={`/img/sprite.svg#${data[type]?.icon || 'check'}`}></use>
          </svg>
        </div>
        <div className="rating-block__right">
          <span className="rating-block__mark">{Math.round(value)}</span>/{max_value}
        </div>
      </div>
    </div>
  )
}
