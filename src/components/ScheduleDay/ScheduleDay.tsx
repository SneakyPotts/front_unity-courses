import classNames from 'classnames'
import React from 'react'

import { LessonItem } from '@components/LessonItem'

import { Loader } from '@UI/Loader'

import type { ScheduleDayProps } from './ScheduleDay.props'

export function ScheduleDay({ title = 'Розклад уроків', schedule: { data, isLoading, isError }, isTeacher, isStudent }: ScheduleDayProps) {
  return (
    <div className="schedule__block">
      <h2 className="schedule__title">{title}</h2>

      {isLoading && <Loader />}
      {isError && <p className="text-center">Щось пішло не так...</p>}

      <ul className={classNames('lessons-list', 'schedule__lessons')}>
        {!!data?.length ? (
          data.map((item: any) => (
            <LessonItem
              key={item.id}
              {...item}
              isTeacher={isTeacher}
              isStudent={isStudent}
            />
          ))
        ) : (
          <li>&quot;{title}&quot; is coming soon...</li>
        )}
      </ul>
    </div>
  )
}
