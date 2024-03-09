'use client'

import classNames from 'classnames'
import React from 'react'

import { Button } from '_ui/Button'
import { TeacherCard } from '_ui/TeacherCard'

import type { AsideLessonProps } from './AsideLesson.props'

export function AsideLesson({ humans, videoLink, isStudent, isEdit }: AsideLessonProps) {
  const onTop = () => {
    document.body.scrollTop = 0 // For Safari
    document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
  }

  return (
    <div className={'lesson-section__right'}>
      <div className="lesson-section__container">
        {isEdit ? (
          <div className="load-avatar__warn --lesson">
            <div className="load-avatar__top">
              <svg className="field__icon">
                <use href="/img/sprite.svg#warn"></use>
              </svg>
              Увага!
            </div>
            <div className="load-avatar__text">
              <p>Ваші зміни врахуються тільки якщо вони пройдуть можерацію.</p>
              <p>Рішення про вистовок модерації ви отримаєте сповіщенням в своєму кабінеті.</p>
              <p>Якщо через 24 годин після відправлення змін ви не отримали сповіщення про рішення модерації, зверніться до служби підтримки.</p>
            </div>
          </div>
        ) : (
          <>
            {humans?.map((v, i, arr) => (
              <TeacherCard
                key={`${v.first_name}${i}`}
                className={classNames('lesson-section__teacher ', 'teacher-card--big', { 'teacher-card--main': arr.length > 1 && i === 0 })}
                data={v}
                isStudent={isStudent}
              />
            ))}
            {videoLink && (
              <div className="lesson-section__marks">
                <Button
                  variant={'border'}
                  fulFill
                  className="lesson-section__marks-btn"
                  href={videoLink}
                  target={'_blank'}
                >
                  <svg className="lesson-section__marks-svg">
                    <use href="/img/sprite.svg#camera"></use>
                  </svg>
                  запис уроку
                </Button>
              </div>
            )}
          </>
        )}
      </div>
      {/*<button*/}
      {/*  className="lesson-section__back"*/}
      {/*  onClick={onTop}*/}
      {/*>*/}
      {/*  <svg className="lesson-section__back-svg">*/}
      {/*    <use href="/img/sprite.svg#arrow-up"></use>*/}
      {/*  </svg>*/}
      {/*</button>*/}
    </div>
  )
}
