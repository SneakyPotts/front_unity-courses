import React from 'react'

import Link from 'next/link'

import type { TPageProps } from '@assets/types/globals'
import { StatisticsItem } from '@components/StatisticSubjects/StatisticsItem'
import { studentCourseStats } from '@http/student/server'
import type { TStatsTypes } from '@http/student/types'

export default async function AsideRight({ params }: TPageProps) {
  const { data: stats, error } = await studentCourseStats(params.course_id as string)
  console.log(stats)
  return (
    <div className="subject__statistics-block statistics-block statistics-block--row">
      <div className="statistics-block__top">
        <h2 className="statistics-block__title">Статистика</h2>

        <Link
          href="/statistics"
          className={'reviews__shop-link statistics-block__link link'}
        >
          Всі Оцінки
          <svg className={'reviews__arrow-svg reviews__arrow--active'}>
            <use href="/img/sprite.svg#arrow-ridth"></use>
          </svg>
        </Link>
      </div>
      <div className="statistics-block__bottom">
        <div className="statistics-block__list">
          {error && <p className="text-center">Щось пішло не так...</p>}
          {stats &&
            Object.keys(stats)?.map((key, i) => (
              <StatisticsItem
                key={`${key}-${i}`}
                type={key as TStatsTypes}
                {...stats[key as TStatsTypes]}
              />
            ))}
          <StatisticsItem
            type={'progress'}
            progress={stats?.visiting.percentage}
            value={0}
            max_value={0}
            percentage={0}
          />
        </div>
      </div>
    </div>
  )
}
