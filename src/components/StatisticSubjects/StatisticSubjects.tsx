import React, { useState } from 'react'
import { useSessionStorage } from 'usehooks-ts'

import { useQueryStudentStats } from '@http/student/client.statistics'
import type { TStatsTypes } from '@http/student/types'

import { CustomLink } from '_ui/CustomLink'
import { Loader } from '_ui/Loader'

import { StatisticDropdown } from './StatisticDropdown'
import type { StatisticSubjectsProps } from './StatisticSubjects.props'
import { StatisticsItem } from './StatisticsItem'

export function StatisticSubjects({ isShort = false }: StatisticSubjectsProps) {
  const [courseId, setCourseId] = useState('')

  const [childID] = useSessionStorage('childID', '')

  const {
    stats: { data: stats, isLoading: isStatsLoading, isError: isStatsError },
    brief: { data: brief, isLoading: isBriefLoading, isError: isBriefError },
  } = useQueryStudentStats({ course_id: courseId, student_id: childID, tab_id: 'common' })

  const isLoading = isBriefLoading || isStatsLoading
  const isError = isBriefError || isStatsError

  return (
    <div className="statistics__block statistics-block">
      <div className="statistics-block__top">
        <div className="statistics-block__left">
          <h2 className="statistics-block__title">Статистика</h2>

          <StatisticDropdown
            name="dropdown"
            list={brief}
            onChange={(id) => setCourseId(id)}
          />
        </div>

        {isShort && (
          <CustomLink
            href={'/statistics'}
            className="statistics-block__link link"
          >
            Всі статистики
            <svg>
              <use href="/img/sprite.svg#arrow-right"></use>
            </svg>
          </CustomLink>
        )}
      </div>

      <div className="statistics-block__bottom">
        {isLoading && <Loader />}
        {isError && <p className="text-center">Щось пішло не так...</p>}
        {!isLoading && !isError && stats && (
          <div className="statistics-block__list">
            {stats &&
              Object.keys(stats)?.map((key, i) => (
                <StatisticsItem
                  key={`${key}-${i}`}
                  type={key as TStatsTypes}
                  {...stats[key as TStatsTypes]}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  )
}
