import classNames from 'classnames'
import React from 'react'

import type { TPageProps, TTeacher } from '@assets/types/globals'
import { LessonHeader } from '@components/LessonHeader'
import { aboutMeRequest } from '@http/profile/server'
import { getLessonContent } from '@http/student/server'
import { getTeacherLessonContent } from '@http/teacher/server'

import { Banner } from '_ui/Banner'
import { Button } from '_ui/Button'
import { RequestError } from '_ui/RequestError'
import { TeacherCard } from '_ui/TeacherCard'

import { LessonPageContent } from '_content/LessonPageContent'

export default async function LessonPage({ params }: TPageProps) {
  const { data: me } = await aboutMeRequest()
  const role = {
    teacher: me?.role === 20,
    student: me?.role === 2,
    parent: me?.role === 10,
  }

  const { data, error } = await (role.teacher ? getTeacherLessonContent : getLessonContent)(params.lesson_id as string)

  if (error) return <RequestError {...error} />

  return (
    <>
      <LessonHeader data={data} />
      <Aside
        lectors={data?.lectors}
        isTeacher={role.teacher}
        color={data?.course_color}
        videoUrl={data?.video_url}
      />
      <LessonPageContent
        data={data}
        role={role}
      />
    </>
  )
}

function Aside({ lectors, isTeacher, color, videoUrl }: { lectors?: TTeacher[]; isTeacher?: boolean; color?: string; videoUrl?: string }) {
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
