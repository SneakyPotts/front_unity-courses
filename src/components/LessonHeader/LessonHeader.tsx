'use client'

import classNames from 'classnames'
import React from 'react'
import { useToggle } from 'usehooks-ts'

import Image from 'next/image'

import { formatDateInGenitive, imgBlur, subColor } from '@assets/utils'

import type { LessonHeaderProps } from './LessonHeader.props'

export function LessonHeader({ data, isCheckWork }: LessonHeaderProps) {
  const [isOpenMobile, setIsOpenMobile] = useToggle(false)

  return (
    <div
      className={classNames('theme-card lesson-section__theme', { 'theme-card--active': isOpenMobile })}
      style={{ backgroundColor: data?.course_color }}
    >
      <div className={'theme-card__inner courses-lesson__block--element'}>
        <div className={'theme-card__top'}>{data?.topic_title}</div>
        <h1 className={'theme-card__title courses-lesson__title--element'}>{data?.title}</h1>
        {!!data?.start_time && !isCheckWork && (
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
        onClick={setIsOpenMobile}
        aria-expanded="false"
        aria-label="Відкрити інформацію про предмет"
      >
        <svg className="theme-card__more-svg">
          <use href="/img/sprite.svg#arrow-down-mini" />
        </svg>
      </button>
      <div className="theme-card__info" />
    </div>
  )
}
