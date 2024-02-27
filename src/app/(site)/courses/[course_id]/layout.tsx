import classNames from 'classnames'
import React, { type ReactNode } from 'react'

import Image from 'next/image'

import type { TLayoutProps, TTeacher } from '@assets/types/globals'
import { formatDateInGenitive, imgBlur, subColor } from '@assets/utils'
import { getCourseDetail } from '@http/courses/server'
import type { TCourseDetail } from '@http/courses/type'

import { PageWrapper } from '_ui/PageWrapper'
import { TeacherCard } from '_ui/TeacherCard'
import { TeacherForCourse } from '_ui/TeacherForCourse'

interface CoursesDetailLayoutProps extends TLayoutProps {
  header: ReactNode
  aside: ReactNode
  statistics: ReactNode
}

export default async function CoursesDetailLayout({ children, aside, statistics, params }: CoursesDetailLayoutProps) {
  const { data, error } = await getCourseDetail(params.course_id as string)

  const isPurchase = !!data?.purchased

  return (
    <PageWrapper>
      <section className={isPurchase ? 'courses-lesson' : 'archive'}>
        <div className={isPurchase ? 'courses-lesson__inner' : 'archive__inner'}>
          {isPurchase && <PurchasedHeader data={data!} />}
          {children}
          {isPurchase ? (
            <div className={'subject__right course-detail__ridth--element'}>
              <div className={'course-detail__block'}>
                <AsideTeacherList lectors={data!.lectors} />
                {statistics}
              </div>
            </div>
          ) : (
            aside
          )}
        </div>
      </section>
    </PageWrapper>
  )
}

function PurchasedHeader({ data }: { data: TCourseDetail }) {
  return (
    <div className={'subject__left'}>
      <div
        className={' subject-card--blue my-catalog__block'}
        style={{ backgroundColor: data.color }}
      >
        <div className="my-catalog__left">
          <h3 className={'my-catalog__left-title'}>{data.title}</h3>
          <div
            className={'my-catalog__left-text'}
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
          <div className={'my-catalog__duration'}>
            {!!data.closest_lecture && (
              <div
                className={'my-catalog__condition my-catalog__condition--violet'}
                style={{ backgroundColor: subColor[data.color] }}
              >
                <svg className={data.format === 'self' ? 'courses-catalog__svg courses-catalog__svg-stroke' : 'archive__data-svg'}>
                  <use href={`/img/sprite.svg#${data.format === 'self' ? 'learn' : 'clock'}`}></use>
                </svg>
                <p>найближче заняття - {formatDateInGenitive(new Date(data.closest_lecture), true)}</p>
              </div>
            )}
            {data.format !== 'self' && (
              <div className={'my-catalog__duration-item'}>
                <svg className={'nav__link-svg'}>
                  <use href="/img/sprite.svg#camera"></use>
                </svg>
                {data.format === 'mix' && (
                  <svg className={'courses-catalog__svg courses-catalog__svg-stroke'}>
                    <use href="/img/sprite.svg#learn"></use>
                  </svg>
                )}
              </div>
            )}
          </div>
          <div className="my-catalog__box">
            {!!data?.duration_in_months && (
              <div className={'archive__duration-box'}>
                <svg className="nav__link-svg">
                  <use href="/img/sprite.svg#calendar"></use>
                </svg>
                <p>{data?.duration_in_months} місяць</p>
              </div>
            )}
            {!!data?.number_of_lectures && (
              <div className={'archive__duration-box'}>
                <svg className="nav__link-svg">
                  <use href="/img/sprite.svg#material"></use>
                </svg>
                <p>{data.number_of_lectures} занять</p>
              </div>
            )}
            {!!data?.lectures_hours && (
              <div className={'archive__duration-box'}>
                <svg className="nav__link-svg">
                  <use href="/img/sprite.svg#clock"></use>
                </svg>
                <p>{data?.lectures_hours} годин</p>
              </div>
            )}
            <div className={'my-catalog__item  my-catalog__teacher'}>
              {data?.lectors?.map((lecturer) => (
                <TeacherForCourse
                  key={lecturer.id}
                  lecturer={lecturer}
                />
              ))}
            </div>
          </div>
          <div className={'my-catalog__contact close'}>
            <button className={'my-catalog__contact-btn'}>
              <svg className={'my-catalog__contact-svg'}>
                <use href="/img/sprite.svg#arrow-top"></use>
              </svg>
            </button>
          </div>
        </div>
        <div className={'my-catalog__ridth'}>
          <div className="my-catalog__ridth-time">
            <svg className={'nav__link-svg'}>
              <use href="/img/sprite.svg#clock"></use>
            </svg>
            <p>дійсний ще {data.available_days || '0'} днів</p>
          </div>
          <div className={'my-catalog__ridth-photo'}>
            <Image
              src={data.cover}
              width={100}
              height={100}
              style={{ objectFit: 'contain' }}
              {...imgBlur}
              alt={data.title}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function AsideTeacherList({ lectors }: { lectors: TTeacher[] }) {
  return (
    <div className="lesson-section__container">
      {lectors.map((v, i) => (
        <TeacherCard
          key={v.id}
          data={v}
          className={classNames('teacher-card--big', { 'lesson-section__card-card': !i })}
          isMain={!i}
        />
      ))}
    </div>
  )
}
