import classNames from 'classnames'
import React from 'react'

import Link from 'next/link'

import { formatDateInGenitive } from '@assets/utils'
import { TypesList } from '@components/TypesList'

import { Accordion } from '_ui/Accordion'

import type { ScheduleSectionProps } from './ScheduleSection.props'

export function ScheduleSection({ courseId, courseFree, topics }: ScheduleSectionProps) {
  return (
    <div
      id="program"
      className={'archive__program'}
    >
      <h3 className={'archive__program-subtitle archive__subtitle'}>Програма та графік</h3>

      {topics?.map((topic, i) => (
        <Accordion
          key={topic.id}
          title={`${i + 1} ${topic.title}`}
        >
          <ol className="plan__list">
            {!!topic?.lectures.length ? (
              topic.lectures.map((lecture, j) => (
                <li
                  key={lecture.id}
                  className="plan__item"
                >
                  <div className="plan__info">
                    <span className={classNames('plan__subnumber', 'plan__subnumber--active')}>
                      {i + 1}.{j + 1}
                    </span>
                    {courseFree || lecture.is_free ? (
                      <Link
                        href={`/lessons/${lecture.id}`}
                        className="plan__link"
                      >
                        {lecture.title}
                      </Link>
                    ) : (
                      <span className="plan__link">{lecture.title}</span>
                    )}
                  </div>
                  <div className="plan__wrapper">
                    <span className="plan__date">
                      {lecture.is_free && !courseFree && (
                        <span className="plan__is-free">
                          <svg className="btn__icon">
                            <use href="/img/sprite.svg#hot-offer"></use>
                          </svg>
                          <span>безкоштовно</span>
                        </span>
                      )}
                      <time>{lecture.start_time && formatDateInGenitive(new Date(lecture.start_time))}</time>
                    </span>
                    <TypesList
                      className="plan__types"
                      data={lecture}
                    />
                  </div>
                </li>
              ))
            ) : (
              <li className="plan__item">
                <p className="text-center">Lessons is coming soon...</p>
              </li>
            )}
          </ol>
        </Accordion>
      ))}
    </div>
  )
}
