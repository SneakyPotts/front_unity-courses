import { isAfter } from 'date-fns'
import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { formatDateInGenitive, subColor } from '@assets/utils'
import { Rating } from '@smastrom/react-rating'

import { Button } from '_ui/Button'
import { TeacherForCourse } from '_ui/TeacherForCourse'

import type { CourseCardProps } from './CourseCard.props'

export function CourseCard({ isArchived, ...course }: CourseCardProps) {
  return (
    <div
      className="my-catalog__block"
      style={{ backgroundColor: isArchived ? '#f2f2f2' : course.color }}
    >
      <div className="my-catalog__left">
        {isArchived ? (
          <h3 className="my-catalog__left-title">{course.title}</h3>
        ) : (
          <Link
            href={`/courses/${course.id}`}
            className="my-catalog__left-title"
          >
            {course.title}
          </Link>
        )}
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
              <p>найближче заняття - {formatDateInGenitive(new Date(course.closest_lecture), true)}</p>
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

          {course.lectors.map((lecturer) => (
            <TeacherForCourse
              key={lecturer.id}
              lecturer={lecturer}
            />
          ))}
        </div>
        <div className="my-catalog__contact close">
          <button className="my-catalog__contact-btn">
            <svg className="my-catalog__contact-svg">
              <use href="/img/sprite.svg#arrow-bottom"></use>
            </svg>
          </button>
        </div>
      </div>
      <div className="my-catalog__ridth">
        {isArchived ? (
          // <Button className={' courses-catalog__btn  some_button my-catalog__review-btn'}>
          //   <svg className="courses-catalog__svg">
          //     <use href="/img/sprite.svg#message"></use>
          //   </svg>
          //   залишити відгук
          // </Button>
          <Rating
            style={{ maxWidth: 100 }}
            value={course.rating || 0}
            readOnly
          />
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
              style={{ objectFit: 'contain' }}
              alt={course.title}
            />
          </div>
        )}
      </div>
    </div>
  )
}

//Courses completed
export function CourseReview() {
  return (
    <div className={'subject-card--purple my-catalog__block'}>
      <div className="my-catalog__left">
        <h3 className={'my-catalog__left-title'}>Введення в Штучний Інтелект та Машинне Навчання</h3>
        <p className={'my-catalog__left-text'}>
          Програма курсу включає в себе вивчення різноманітних аспектів образотворчого мистецтва, від традиційних технік до сучасних течій. Наші викладачі підходять до
          навчання з креативним підходом, стимулюючи учнів думати творчо та виражати свої ідеї через мистецтво. Високоякісні відеоуроки, які покривають різні аспекти мистецтва
          та надають можливість долучитися до творчих завдань.
        </p>
        <div className="my-catalog__box">
          <div className={'my-catalog__item'}>
            <svg className={'nav__link-svg'}>
              <use href="/img/sprite.svg#clock"></use>{' '}
            </svg>
            <p>50 годин</p>
          </div>
          <div className={'my-catalog__item'}>
            <div className={'courses-catalog__teacher-img'}>
              <Image
                src="https://loremflickr.com/640/360"
                alt="аватарка акаунта"
              />
            </div>
            <button className={'my-catalog__item-name'}>Мітрошина Г. О.</button>
          </div>
        </div>
      </div>
      <div className={'my-catalog__ridth'}>
        <Button className={' courses-catalog__btn  some_button my-catalog__review-btn'}>
          <svg className="courses-catalog__svg">
            <use href="/img/sprite.svg#message"></use>
          </svg>
          залишити відгук
        </Button>
        <div className={'my-catalog__ridth-photo'}>
          <Image
            src="https://picsum.photos/100/100"
            alt="фото курсу"
          />
        </div>
      </div>
    </div>
  )
}
export function CourseGrade() {
  return (
    <div className={'subject-card--green my-catalog__block'}>
      <div className="my-catalog__left">
        <h3 className={'my-catalog__left-title'}>Введення в Штучний Інтелект та Машинне Навчання</h3>
        <p className={'my-catalog__left-text'}>
          Програма курсу включає в себе вивчення різноманітних аспектів образотворчого мистецтва, від традиційних технік до сучасних течій. Наші викладачі підходять до
          навчання з креативним підходом, стимулюючи учнів думати творчо та виражати свої ідеї через мистецтво. Високоякісні відеоуроки, які покривають різні аспекти мистецтва
          та надають можливість долучитися до творчих завдань.
        </p>
        <div className="my-catalog__box">
          <div className={'my-catalog__item'}>
            <svg className={'nav__link-svg'}>
              <use href="/img/sprite.svg#clock"></use>{' '}
            </svg>
            <p>50 годин</p>
          </div>
          <div className={'my-catalog__item'}>
            <div className={'courses-catalog__teacher-img'}>
              <Image
                src="https://loremflickr.com/640/360"
                alt="аватарка акаунта"
              />
            </div>
            <button className={'my-catalog__item-name'}>Мітрошина Г. О.</button>
          </div>
        </div>
      </div>
      <div className={'my-catalog__ridth'}>
        <div className={'reviews__ratings '}>
          <svg className="archive__reviews-svg">
            <use href="/img/sprite.svg#star"></use>
          </svg>
          <svg className="archive__reviews-svg">
            <use href="/img/sprite.svg#star"></use>
          </svg>
          <svg className="archive__reviews-svg">
            <use href="/img/sprite.svg#star"></use>
          </svg>
          <svg className="archive__reviews-svg">
            <use href="/img/sprite.svg#star"></use>
          </svg>
          <svg className={'archive__reviews-svg'}>
            <use href="/img/sprite.svg#star-strok"></use>
          </svg>
          <p className={'reviews__ratings-text'}>4.5</p>
        </div>
        <div className={'my-catalog__ridth-photo'}>
          <Image
            src="https://picsum.photos/100/100"
            alt="фото курсу"
            width={100}
            height={100}
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
    </div>
  )
}
