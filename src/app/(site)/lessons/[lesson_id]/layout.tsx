import classNames from 'classnames'
import React from 'react'

import type { TLayoutProps, TTeacher } from '@assets/types/globals'
import { LessonHeader } from '@components/LessonHeader'
import { aboutMeRequest } from '@http/profile/server'
import { getLessonContent } from '@http/student/server'
import { getTeacherLessonContent } from '@http/teacher/server'

import { Banner } from '_ui/Banner'
import { PageWrapper } from '_ui/PageWrapper'
import { TeacherCard } from '_ui/TeacherCard'

export default async function LessonLayout({ params, children }: TLayoutProps) {
  const { data: me } = await aboutMeRequest()
  const role = {
    teacher: me?.role === 20,
    student: me?.role === 2,
    parent: me?.role === 10,
  }

  const { data, error } = await (role.teacher ? getTeacherLessonContent : getLessonContent)(params.lesson_id as string)

  if (error) return <>{children}</>

  return (
    <PageWrapper>
      <section className={'courses-lesson'}>
        <div className={'courses-lesson__inner'}>
          <LessonHeader data={data} />
          <Aside
            lectors={data?.lectors}
            isTeacher={role.teacher}
          />
          {children}
        </div>
      </section>
    </PageWrapper>
  )
}

function Aside({ lectors, isTeacher }: { lectors?: TTeacher[]; isTeacher?: boolean }) {
  return (
    <div className="lesson-section__right courses-lesson__right--element">
      {!!lectors?.length && (
        <div className="lesson-section__container">
          {lectors?.map((v, i) => (
            <TeacherCard
              key={v.id}
              data={v}
              className={classNames('teacher-card--big', { 'lesson-section__card-card': !i })}
              isMain={!i}
            />
          ))}
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
