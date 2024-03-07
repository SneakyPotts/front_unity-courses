import classNames from 'classnames'
import React, { type ReactNode } from 'react'

import type { TLayoutProps, TTeacher } from '@assets/types/globals'
import { SubjectHeader } from '@components/SubjectHeader'
import { getCourseDetail, getTeacherCourseDetail } from '@http/courses/server'
import { aboutMeRequest } from '@http/profile/server'

import { Banner } from '_ui/Banner'
import { CourseCard } from '_ui/CourseCard'
import { PageWrapper } from '_ui/PageWrapper'
import { RequestError } from '_ui/RequestError'
import { TeacherCard } from '_ui/TeacherCard'

interface CoursesDetailLayoutProps extends TLayoutProps {
  header: ReactNode
  aside: ReactNode
  statistics: ReactNode
}

export default async function CoursesDetailLayout({ children, aside, statistics, params }: CoursesDetailLayoutProps) {
  const { data: me } = await aboutMeRequest()
  const role = {
    teacher: me?.role === 20,
    student: me?.role === 2,
    parent: me?.role === 10,
  }

  const { data, error } = await (role.teacher ? getTeacherCourseDetail : getCourseDetail)(params.course_id as string)

  const isPurchase = !!data?.purchased

  if (!data || error) return <RequestError {...error} />

  return (
    <PageWrapper>
      <section className={isPurchase || role.teacher ? 'courses-lesson__inner' : 'archive__inner'}>
        {role.teacher || isPurchase ? (
          <CourseCard
            {...data}
            isTeacher={role.teacher}
          />
        ) : (
          <SubjectHeader data={data} />
        )}
        {children}
        <div className={classNames('course-detail__block', { archive__banner: !isPurchase })}>
          {isPurchase || role.teacher ? (
            <>
              <AsideTeacherList lectors={data!.lectors} />
              {role.teacher ? <Banner /> : statistics}
            </>
          ) : (
            aside
          )}
        </div>
      </section>
    </PageWrapper>
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
