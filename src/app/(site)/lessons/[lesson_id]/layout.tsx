import classNames from 'classnames'
import React from 'react'

import Image from 'next/image'

import type { TLayoutProps } from '@assets/types/globals'
import { formatDateInGenitive, imgBlur, subColor } from '@assets/utils'
import { getLessonContent } from '@http/courses/server'

import { PageWrapper } from '_ui/PageWrapper'
import { TeacherCard } from '_ui/TeacherCard'

export default async function LessonLayout({ params, children }: TLayoutProps) {
  const { data, error } = await getLessonContent(params.lesson_id as string)

  if (error) return <>{children}</>

  return (
    <PageWrapper>
      <section className={'courses-lesson'}>
        <div className={'courses-lesson__inner'}>
          <div
            className={'theme-card lesson-section__theme'}
            style={{ backgroundColor: data?.course_color }}
          >
            <div className={'theme-card__inner courses-lesson__block--element'}>
              <div className={'theme-card__top'}>{data?.topic_title}</div>
              <h1 className={'theme-card__title courses-lesson__title--element'}>{data?.title}</h1>
              {!!data?.start_time && (
                <div
                  className={'courses-lesson__data my-catalog__condition--violet'}
                  style={{ backgroundColor: subColor[data?.course_color || ''] }}
                >
                  <svg className="archive__data-svg">
                    <use href="/img/sprite.svg#clock" />
                  </svg>
                  <p>початок заняття - {formatDateInGenitive(new Date(data.start_time), true)}</p>
                </div>
              )}

              {data?.course_icon && (
                <div className="courses-lesson__img">
                  <Image
                    src={data.course_icon}
                    width={100}
                    height={100}
                    {...imgBlur}
                    alt={data?.title}
                  />
                </div>
              )}
            </div>
            <button
              className="theme-card__more"
              aria-expanded="false"
              aria-label="Відкрити інформацію про предмет"
            >
              <svg className="theme-card__more-svg">
                <use xlinkHref="/img/sprite.svg#arrow-down-mini" />
              </svg>
            </button>
            <div className="theme-card__info" />
          </div>
          <div className="lesson-section__right courses-lesson__right--element">
            <div className="lesson-section__container">
              {data?.lectors.map((v, i) => (
                <TeacherCard
                  key={v.id}
                  data={v}
                  className={classNames('teacher-card--big', { 'lesson-section__card-card': !i })}
                  isMain={!i}
                />
              ))}
            </div>
          </div>
          {children}
        </div>
      </section>
    </PageWrapper>
  )
}
