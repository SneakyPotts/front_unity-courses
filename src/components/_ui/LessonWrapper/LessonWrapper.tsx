import classNames from 'classnames'
import React from 'react'

import { LessonHeader } from '@components/LessonHeader'
import { aboutMeRequest } from '@http/profile/server'

import { Banner } from '_ui/Banner'
import { Button } from '_ui/Button'
import { TeacherCard } from '_ui/TeacherCard'

import type { LessonAsideProps, LessonWrapperProps } from './LessonWrapper.props'

export async function LessonWrapper({ data, isCheckWork, aside, children }: LessonWrapperProps) {
  const { data: me } = await aboutMeRequest()
  const role = {
    teacher: me?.role === 20,
    student: me?.role === 2,
    parent: me?.role === 10,
  }

  return (
    <>
      <LessonHeader
        data={data}
        isCheckWork={isCheckWork}
      />
      <LessonAside
        {...aside}
        isTeacher={role.teacher}
      />
      {children}
    </>
  )
}

function LessonAside({ lectors, isTeacher, color, videoUrl }: LessonAsideProps) {
  return (
    <div className="lesson-section__right courses-lesson__right--element">
      {!!lectors?.length && (
        <div
          className="lesson-section__container lesson--teachers"
          style={{ backgroundColor: color }}
        >
          {lectors?.map((v, i) => (
            <TeacherCard
              key={v.id}
              data={v}
              className={classNames('teacher-card--big', { 'lesson-section__card-card': !i })}
              isMain={!i}
            />
          ))}

          {videoUrl && (
            <Button
              variant="border"
              fulFill
              href={videoUrl}
              target="_blank"
            >
              <svg className="btn__icon">
                <use href="/img/sprite.svg#webcam"></use>
              </svg>
              запис уроку
            </Button>
          )}
        </div>
      )}
      {isTeacher && (
        <div style={{ width: '100%' }}>
          <Banner />
        </div>
      )}
    </div>
  )
}
