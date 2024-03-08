import classNames from 'classnames'
import React from 'react'

import type { TPageProps, TTeacher } from '@assets/types/globals'
import { SubjectHeader } from '@components/SubjectHeader'
import { getCourseDetail } from '@http/courses/server'
import { aboutMeRequest } from '@http/profile/server'
import { getTeacherCourseDetail } from '@http/teacher/server'

import { Banner } from '_ui/Banner'
import { CourseCard } from '_ui/CourseCard'
import { PageWrapper } from '_ui/PageWrapper'
import { RequestError } from '_ui/RequestError'
import { TeacherCard } from '_ui/TeacherCard'

import { CourseDetailContent } from '_content/CourseDetailContent'
import { PurchasedCourseDetailContent } from '_content/PurchasedCourseDetailContent'
import { StudentCourseStatsContent } from '_content/StudentCourseStatsContent'

export default async function CourseDetailPage({ params, searchParams }: TPageProps) {
  const { data: me } = await aboutMeRequest()
  const role = {
    teacher: me?.role === 20,
    student: me?.role === 2,
    parent: me?.role === 10,
  }

  const { data, error } = await (role.teacher ? getTeacherCourseDetail : getCourseDetail)(params.course_id as string)

  const isPurchase = !!data?.purchased || role.teacher

  if (error) return <RequestError {...error} />

  if (data)
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

          {isPurchase ? <PurchasedCourseDetailContent data={data} /> : <CourseDetailContent data={data} />}

          <div className={classNames('course-detail__block', { archive__banner: !isPurchase })}>
            {isPurchase || role.teacher ? (
              <>
                <AsideTeacherList lectors={data!.lectors} />
                {role.teacher ? (
                  <Banner />
                ) : (
                  <StudentCourseStatsContent
                    course_id={params.course_id as string}
                    role={role}
                  />
                )}
              </>
            ) : (
              <AsideBanners />
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

function AsideBanners() {
  return (
    <>
      <div className={'archive__banner-box'}>
        <Banner />
      </div>
      <div className={'archive__banner-box'}>
        <Banner />
      </div>
      <div className={'archive__banner-box'}>
        <Banner />
      </div>
    </>
  )
}
