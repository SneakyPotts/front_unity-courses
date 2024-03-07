import React from 'react'

import Image from 'next/image'

import type { TeacherCourseLessonProps } from './TeacherCourseLesson.props'

export function TeacherCourseLesson({}: TeacherCourseLessonProps) {
  return (
    <div className={'teacher-course-card'}>
      <div className="teacher-course-card__title">Вступ до мови програмування Python</div>
      <p className={'teacher-course-card__desc'}>
        Програма курсу включає в себе вивчення різноманітних аспектів образотворчого мистецтва, від традиційних технік до сучасних течій. Наші викладачі підходять до навчання
        з креативним підходом, стимулюючи учнів думати творчо та виражати свої ідеї через мистецтво. Високоякісні відеоуроки, які покривають різні аспекти мистецтва та надають
        можливість долучитися до творчих завдань.
      </p>
      <div className="teacher-course-card__conditions">
        <ul className={'teacher-course-card__content'}>
          <li>
            <div
              className="my-catalog__condition my-catalog__condition--violet"
              style={{ backgroundColor: 'rgb(253, 223, 194)' }}
            >
              <svg className="archive__data-svg">
                <use href="/img/sprite.svg#clock" />
              </svg>
              <p>найближче заняття - 28 березня, 16:22</p>
            </div>
            <svg className={'nav__link-svg'}>
              <use href="/img/sprite.svg#camera"></use>
            </svg>
          </li>
          <li>
            <div className="my-catalog__box">
              <div className="my-catalog__item">
                <svg className="nav__link-svg">
                  <use href="/img/sprite.svg#material" />
                </svg>
                <p>1 місяців</p>
              </div>
              <div className="my-catalog__item">
                <svg className="nav__link-svg">
                  <use href="/img/sprite.svg#calendar" />
                </svg>
                <p>5 занять</p>
              </div>
              <div className="my-catalog__item">
                <svg className="nav__link-svg">
                  <use href="/img/sprite.svg#clock" />
                </svg>
                <p>3 годин</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className={'teacher-course-card__box'}>
        <ul className={'teacher-course-card__student'}>
          <li>
            <Image
              src={'https://loremflickr.com/640/360'}
              width={30}
              height={30}
              style={{ objectFit: 'cover', borderRadius: 25, display: 'block' }}
              alt=""
            />
          </li>
          <li>
            <Image
              src={'https://loremflickr.com/640/360'}
              width={30}
              height={30}
              style={{ objectFit: 'cover', borderRadius: 25, display: 'block' }}
              alt=""
            />
          </li>
          <li>
            <Image
              src={'https://loremflickr.com/640/360'}
              width={30}
              height={30}
              style={{ objectFit: 'cover', borderRadius: 25, display: 'block' }}
              alt=""
            />
          </li>
          <li>
            <Image
              src={'https://loremflickr.com/640/360'}
              width={30}
              height={30}
              style={{ objectFit: 'cover', borderRadius: 25, display: 'block' }}
              alt=""
            />
          </li>
          <li>
            <Image
              src={'https://loremflickr.com/640/360'}
              width={30}
              height={30}
              style={{ objectFit: 'cover', borderRadius: 25, display: 'block' }}
              alt=""
            />
          </li>
        </ul>
        <button className={'teacher-course-card__btn'}>
          Всі учасники
          <svg>
            <use href="/img/sprite.svg#arrow-ridth"></use>
          </svg>
        </button>
      </div>
      <Image
        className={'teacher-course-card__img'}
        src={'https://loremflickr.com/640/360'}
        width={100}
        height={100}
        style={{ objectFit: 'cover', borderRadius: 5 }}
        alt=""
      />
    </div>
  )
}
