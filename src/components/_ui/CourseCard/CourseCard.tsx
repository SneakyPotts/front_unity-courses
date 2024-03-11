'use client'

import { isAfter } from 'date-fns'
import React, { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { formatDateInGenitive, subColor } from '@assets/utils'

import { Button } from '_ui/Button'
import { RatingStars } from '_ui/RatingStars'
import { TeacherForCourse } from '_ui/TeacherForCourse'

import type { CourseCardProps } from './CourseCard.props'

export function CourseCard({ isArchived, isTeacher, ...course }: CourseCardProps) {
  const router = useRouter()

  const handleRouteStats = () => {
    localStorage.setItem('course_stats', course.id)
    router.push(`/statistics`)
  }

  const [isOpenTeachers, setIsOpenTeachers] = useState(false)

  const changeStateTeacherBlock = () => {
    setIsOpenTeachers(!isOpenTeachers)

    console.log(isOpenTeachers)
  }

  return (
    <div
      className="my-catalog__block"
      style={{ backgroundColor: isArchived ? '#f2f2f2' : course.color }}
    >
      <div className="my-catalog__left">
        <Link
          href={`/courses/${course.id}`}
          className="my-catalog__left-title"
        >
          {course.title}
        </Link>
        <div
          className="my-catalog__left-text"
          dangerouslySetInnerHTML={{ __html: course.description || '' }}
        />
        {!isArchived && (
          <div className={'my-catalog__duration'}>
            <div
              className={'my-catalog__condition my-catalog__condition--violet'}
              style={{ backgroundColor: subColor[course.color] }}
            >
              <svg className={course.format === 'self' ? 'courses-catalog__svg courses-catalog__svg-stroke' : 'archive__data-svg'}>
                <use href={`/img/sprite.svg#${course.format === 'self' ? 'learn' : 'clock'}`}></use>
              </svg>
              {/* FIXME: remove condition */}
              {'closest_lecture' in course && <p>найближче заняття - {formatDateInGenitive(new Date(course.closest_lecture), true)}</p>}
            </div>
            {course.format !== 'self' && (
              <div className={'my-catalog__duration-item'}>
                <svg className={'nav__link-svg'}>
                  <use href="/img/sprite.svg#camera"></use>
                </svg>
                {course.format === 'mix' && (
                  <svg className={'courses-catalog__svg courses-catalog__svg-stroke'}>
                    <use href="/img/sprite.svg#learn"></use>
                  </svg>
                )}
              </div>
            )}
          </div>
        )}
        <div className="my-catalog__box">
          {isArchived ? (
            !!course.available_days && (
              <div className="my-catalog__ridth-time">
                <svg className="nav__link-svg">
                  <use href="/img/sprite.svg#clock"></use>
                </svg>
                <p>дійсний {course.available_days} днів</p>
              </div>
            )
          ) : (
            <>
              {!!course.duration_in_months && (
                <div className="my-catalog__item">
                  <svg className="nav__link-svg">
                    <use href="/img/sprite.svg#material"></use>
                  </svg>
                  <p>{course.duration_in_months} місяців</p>
                </div>
              )}
              {!!course.number_of_lectures && (
                <div className="my-catalog__item">
                  <svg className="nav__link-svg">
                    <use href="/img/sprite.svg#calendar"></use>
                  </svg>
                  <p>{course.number_of_lectures} занять</p>
                </div>
              )}
              {!!course.lectures_hours && (
                <div className="my-catalog__item">
                  <svg className="nav__link-svg">
                    <use href="/img/sprite.svg#clock"></use>
                  </svg>
                  <p>{course.lectures_hours} годин</p>
                </div>
              )}
            </>
          )}

          {!isTeacher ??
            course.lectors.map((lecturer) => (
              <TeacherForCourse
                key={lecturer.id}
                lecturer={lecturer}
              />
            ))}
        </div>
        {isTeacher && course?.students && (
          <div
            className={'teacher-course-card__box'}
            style={{ backgroundColor: subColor[course.color] }}
          >
            <ul className={'teacher-course-card__student'}>
              {course.students.map((v) => (
                <li key={v.id}>
                  <Image
                    src={v.avatar || '/img/static/default-avatar.png'}
                    width={30}
                    height={30}
                    style={{ borderRadius: '50%', display: 'block' }}
                    alt={`${v.last_name} ${v.first_name}`}
                  />
                </li>
              ))}
            </ul>

            <button
              className={'teacher-course-card__btn'}
              onClick={handleRouteStats}
            >
              Всі учасники
              <svg>
                <use href="/img/sprite.svg#arrow-ridth"></use>
              </svg>
            </button>
          </div>
        )}
        <div className="my-catalog__contact close">
          <button
            className="my-catalog__contact-btn"
            onClick={changeStateTeacherBlock}
          >
            <svg className="my-catalog__contact-svg">
              <use href="/img/sprite.svg#arrow-bottom"></use>
            </svg>
          </button>
        </div>
      </div>
      <div className="my-catalog__ridth">
        {isArchived ? (
          course.my_rating ? (
            <RatingStars
              value={course.rating || 0}
              readOnly
            />
          ) : (
            <Button
              className={'courses-catalog__btn  some_button my-catalog__review-btn'}
              href={`/reviews/${course.id}`}
            >
              <svg className="courses-catalog__svg">
                <use href="/img/sprite.svg#message"></use>
              </svg>
              залишити відгук
            </Button>
          )
        ) : (
          <div className="my-catalog__ridth-time">
            <svg className="nav__link-svg">
              <use href="/img/sprite.svg#clock"></use>
            </svg>
            {isAfter(new Date(), new Date(course?.start_date)) ? (
              <p>курс дійсний {course?.available_days ?? 0} днів</p>
            ) : (
              <p>{`старт курсу - ${formatDateInGenitive(new Date(course.start_date))}`}</p>
            )}
          </div>
        )}

        {course.cover && (
          <div className="my-catalog__ridth-photo">
            <Image
              src={course.cover}
              width={100}
              height={100}
              style={{ objectFit: 'cover' }}
              alt={course.title}
            />
          </div>
        )}
      </div>
    </div>
  )
}
