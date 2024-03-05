'use client'

import { useContext, useEffect, useLayoutEffect, useState } from 'react'

import { appContext } from '@components/Context/context'
import { useQueryTeacher } from '@http/teacher/client'
import type { TSimpleCourse } from '@http/teacher/types'

import { HeaderCoursesList } from '_ui/HeaderCoursesList'
import { Loader } from '_ui/Loader'
import { PageWrapper } from '_ui/PageWrapper'

import { TeacherStatisticsContent } from '_content/TeacherStatisticsContent'

export default function StatisticsPage() {
  const { profile, setHeader } = useContext(appContext)
  const role = {
    teacher: profile?.role === 20,
    student: profile?.role === 2,
    parent: profile?.role === 10,
  }

  const [currentCourse, setCurrentCourse] = useState<TSimpleCourse | undefined>(undefined)

  const { courses, stats } = useQueryTeacher({ list: role.teacher, course_id: currentCourse?.id })

  useLayoutEffect(() => {
    currentCourse &&
      setHeader({
        title: `Оцінки по курсу - ${currentCourse?.title}`,
        rightElement: (
          <HeaderCoursesList
            courses={courses?.data}
            current={currentCourse}
            handler={(course) => {
              setCurrentCourse(course)
            }}
          />
        ),
      })
  }, [currentCourse])

  useEffect(() => {
    courses.data && !currentCourse && setCurrentCourse(courses.data[0])
  }, [courses])

  if (!profile || courses.isLoading || stats.isLoading) return <Loader />

  return (
    <PageWrapper>
      <TeacherStatisticsContent
        data={stats.data}
        courseId={currentCourse?.id}
      />
    </PageWrapper>
  )
}
