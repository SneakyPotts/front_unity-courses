import classNames from 'classnames'
import { format } from 'date-fns'
import React from 'react'
import SimpleBar from 'simplebar-react'

import Link from 'next/link'

import { Loader } from '_ui/Loader'

import type { UrgentTaskProps, UrgentTasksProps } from './UrgentTasks.props'

export function UrgentTasks({ list: { data, isLoading, isError }, isStudent }: UrgentTasksProps) {
  return (
    <div className="todo__block todo__block--yellow">
      <div className="todo__tasks">
        <div className="todo__top">
          <h2 className="todo__title">Терміново!</h2>
        </div>

        {isLoading && <Loader />}
        {isError && <p className="text-center">Щось пішло не так...</p>}

        <SimpleBar
          className="todo__bottom"
          autoHide={false}
          style={{ maxHeight: 422 }}
        >
          <div className="todo__wrapper">
            <ul className="todo__list">
              {!!data?.length
                ? data?.map((v) => (
                    <UrgentTask
                      key={v.id}
                      {...v}
                      isStudent={isStudent}
                    />
                  ))
                : !isLoading && <li className="text-center">Список задач пустий...</li>}
            </ul>
          </div>
        </SimpleBar>
      </div>
    </div>
  )
}

export function UrgentTask({ title, deadline, subject_id, lesson_id, isStudent }: UrgentTaskProps) {
  const formatDate = format(new Date(deadline), 'DD.MM H:mm')

  return (
    <li className={'todo-item'}>
      <div className={classNames('checkbox', 'todo-item__checkbox')}>
        {isStudent ? (
          <Link
            href={`/student/lesson?subjectId=${subject_id}&lessonId=${lesson_id}`}
            className="checkbox__todo"
          >
            <div className="checkbox__value">{title}</div>
            {deadline && <div className={classNames('date', `date--orange`, 'checkbox__date')}>{formatDate}</div>}
          </Link>
        ) : (
          <div className="checkbox__todo">
            <div className="checkbox__value">{title}</div>
            {deadline && <div className={classNames('date', `date--orange`, 'checkbox__date')}>{formatDate}</div>}
          </div>
        )}
      </div>
    </li>
  )
}
