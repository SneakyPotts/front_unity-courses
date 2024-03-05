import classNames from 'classnames'
import React, { type ReactNode } from 'react'

import type { TLayoutProps, TTeacher } from '@assets/types/globals'
import { SubjectHeader } from '@components/SubjectHeader'
import { getCourseDetail } from '@http/courses/server'

import { CourseCard } from '_ui/CourseCard'
import { PageWrapper } from '_ui/PageWrapper'
import { TeacherCard } from '_ui/TeacherCard'

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
      <section className={isPurchase ? 'courses-lesson__inner' : 'archive__inner'}>
        {isPurchase ? <CourseCard {...data} /> : <SubjectHeader data={data} />}
        {children}
        <div className={classNames('course-detail__block', { archive__banner: !isPurchase })}>
          {isPurchase ? (
            <>
              <AsideTeacherList lectors={data!.lectors} />
              {statistics}
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
