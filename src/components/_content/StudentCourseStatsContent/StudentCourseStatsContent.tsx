import React from 'react'

import Link from 'next/link'

import { StatisticsItem } from '@components/StatisticSubjects/StatisticsItem'
import { studentCourseStats } from '@http/student/server'
import type { TStatsTypes } from '@http/student/types'

import type { StudentCourseStatsContentProps } from './StudentCourseStatsContent.props'

export async function StudentCourseStatsContent({ course_id, role }: StudentCourseStatsContentProps) {
  if (role.teacher) return null

  const { data: stats, error } = await studentCourseStats(course_id)

  return (
    <div className="subject__statistics-block statistics-block statistics-block--row --vertical">
      <div className="statistics-block__top">
        <h2 className="statistics-block__title">Статистика</h2>

        <Link
          href={'/statistics'}
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
