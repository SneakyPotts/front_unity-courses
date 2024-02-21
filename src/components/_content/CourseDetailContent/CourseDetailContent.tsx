'use client'

import classNames from 'classnames'
import React from 'react'

import Link from 'next/link'

import { SubjectHeader } from '@components/SubjectHeader'
import { useSetHeaderParams } from '@hooks/useSetHeaderParams'

import { tabs } from './CourseDetailContent.data'
import type { CourseDetailContentProps } from './CourseDetailContent.props'
import { AboutSection } from './components/AboutSection'
import { ReviewsSection } from './components/ReviewsSection'
import { ScheduleSection } from './components/ScheduleSection'
import { TeachersSection } from './components/TeachersSection'

export function CourseDetailContent({ data }: CourseDetailContentProps) {
  useSetHeaderParams({ title: 'Про курс' })

  return (
    <div className={'archive__block'}>
      <SubjectHeader data={data} />

      <div className={'archive__menu'}>
        <div className="content-tabs content-tabs--small">
          <div className="content-tabs__wrapper">
            <ul className="content-tabs__list">
              {tabs.map((v, i) => (
                <li
                  key={v.id}
                  className={'content-tabs__item'}
                >
                  <Link
                    href={`#${v.id}`}
                    className={classNames('content-tabs__btn', { 'content-tabs__btn--active': !i })}
                  >
                    {v.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={'archive__about archive__content'}>
            <AboutSection
              title={data?.title}
              description={'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidid'}
            />

            <ScheduleSection
              courseId={data?.id}
              courseFree={data?.format === 'self'}
              topics={data?.topics}
            />
            <TeachersSection lectors={data?.lectors} />
            <ReviewsSection courseId={data?.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
