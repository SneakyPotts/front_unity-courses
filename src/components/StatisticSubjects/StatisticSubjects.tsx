import React, { useState } from 'react'

import { SubjectStatisticArrayItem } from '@assets/types/globals'

import { CustomLink } from '_ui/CustomLink'
import { Loader } from '_ui/Loader'

import { StatisticDropdown } from './StatisticDropdown'
import type { StatisticSubjectsProps } from './StatisticSubjects.props'
import { StatisticsItem } from './StatisticsItem'

export function StatisticSubjects({ studentId, isShort = false }: StatisticSubjectsProps) {
  const [subjectId, setSubjectId] = useState('')

  const parentParams = studentId ? { student_id: studentId } : {}

  // const { data: statistics, isLoading, isError } = useGetStudentStatisticOtherQuery({ subject_id: subjectId, ...parentParams })
  // const { data: subjectsData } = useGetStudentSubjectsQuery(parentParams)

  const isLoading = false
  const isError = false
  const statistics: SubjectStatisticArrayItem[] = Array.from({ length: 3 }).map(() => ({
    type: '',
    value: 5,
    max_value: 10,
    percentage: 50,
  }))

  return (
    <div className="statistics__block statistics-block">
      <div className="statistics-block__top">
        <div className="statistics-block__left">
          <h2 className="statistics-block__title">Статистика</h2>

          <StatisticDropdown
            name="dropdown"
            list={[]} //subjectsData?.subjects
            onChange={(id) => setSubjectId(id)}
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
        <div className="statistics-block__list">
          {isLoading && <Loader />}
          {isError && <p className="text-center">Щось пішло не так...</p>}
          {statistics?.map(
            (item) =>
              (item.type === 'attendance' || !!item.value) && (
                <StatisticsItem
                  key={item.type}
                  {...item}
                />
              ),
          )}
        </div>
      </div>
    </div>
  )
}
