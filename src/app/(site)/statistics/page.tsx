'use client'

import { useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { useSessionStorage, useWindowSize } from 'usehooks-ts'

import { ArchivedStatistics } from '@components/ArchivedStatistics'
import { ChildrenSelectList } from '@components/ChildrenSelectList'
import { appContext } from '@components/Context/context'
import { StatisticSubjects } from '@components/StatisticSubjects'
import { useQueryStudentStats } from '@http/student/client.statistics'
import { useQueryTeacher } from '@http/teacher/client'
import { useQueryTeacherStats } from '@http/teacher/client.statistics'
import type { TSimpleCourse } from '@http/teacher/types'

import { HeaderCoursesList } from '_ui/HeaderCoursesList'
import { Loader } from '_ui/Loader'
import { PageWrapper } from '_ui/PageWrapper'
import { Tabs } from '_ui/Tabs'

import { TeacherStatisticsContent } from '_content/TeacherStatisticsContent'

export default function StatisticsPage() {
  const { profile, setHeader } = useContext(appContext)
  const role = useMemo(
    () => ({
      teacher: profile?.role === 20,
      student: profile?.role === 2,
      parent: profile?.role === 10,
    }),
    [profile],
  )

  const { width } = useWindowSize()

  const [childID] = useSessionStorage('childID', '')

  /* teacher */
  const [currentCourse, setCurrentCourse] = useState<TSimpleCourse | undefined>(undefined)

  const { courses } = useQueryTeacher({ list: role.teacher })
  const { stats: teacherStats } = useQueryTeacherStats({ course_id: currentCourse?.id })

  /* student */
  const [activeTab, setActiveTab] = useState(1)

  const { active, archived } = useQueryStudentStats({
    tab_id: profile && !role.teacher ? (activeTab === 1 ? 'active' : 'archived') : '',
    student_id: childID,
  })

  /*parent*/

  useLayoutEffect(() => {
    if (!profile) return

    role.teacher &&
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

    !role.teacher &&
      setHeader({
        title: 'Статистика успішності',
        rightElement: role.parent && width > 991 ? <ChildrenSelectList /> : null,
      })
  }, [currentCourse, profile, width])

  useEffect(() => {
    if (courses.data && !currentCourse) {
      const courseId = localStorage.getItem('course_stats')

      setCurrentCourse(courseId ? courses.data.find((v) => v.id === courseId) : courses.data[0])
    }
  }, [courses])

  if (!profile) return <Loader />

  return (
    <PageWrapper>
      {role.teacher ? (
        <TeacherStatisticsContent
          data={teacherStats.data}
          isLoading={courses.isLoading || teacherStats.isLoading}
          isError={courses.isError || teacherStats.isError}
          courseId={currentCourse?.id}
        />
      ) : (
        <>
          <Tabs
            list={['Активні', 'Архів']}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isStatic
          />
          {activeTab === 1 && (
            <TeacherStatisticsContent
              {...active}
              isStudent={!role.teacher}
            />
          )}
          {activeTab === 2 && <ArchivedStatistics {...archived} />}
          <StatisticSubjects />
        </>
      )}
    </PageWrapper>
  )
}
