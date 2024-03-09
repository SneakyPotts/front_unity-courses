'use client'

import { useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react'

import { ArchivedStatistics } from '@components/ArchivedStatistics'
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

  /* teacher */
  const [currentCourse, setCurrentCourse] = useState<TSimpleCourse | undefined>(undefined)

  const { courses } = useQueryTeacher({ list: role.teacher })
  const { stats: teacherStats } = useQueryTeacherStats({ course_id: currentCourse?.id })

  /* student */
  const [activeTab, setActiveTab] = useState(1)

  const { active, archived } = useQueryStudentStats({ tab_id: !role.teacher ? (activeTab === 1 ? 'active' : 'archived') : '' })

  useLayoutEffect(() => {
    if (!profile) return

    role.teacher
      ? currentCourse &&
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
      : setHeader({ title: 'Статистика успішності' })
  }, [currentCourse, profile])

  useEffect(() => {
    if (courses.data && !currentCourse) {
      const courseId = localStorage.getItem('course_stats')

      setCurrentCourse(courseId ? courses.data.find((v) => v.id === courseId) : courses.data[0])
    }
  }, [courses])

  if (!profile) return <Loader />

  return (
    <PageWrapper>
      {!role.teacher && (
        <Tabs
          list={['Активні', 'Архів']}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isStatic
        />
      )}
      {role.teacher &&
        (courses.isLoading || teacherStats.isLoading ? (
          <Loader />
        ) : (
          <TeacherStatisticsContent
            data={teacherStats.data}
            courseId={currentCourse?.id}
          />
        ))}
      {!role.teacher &&
        activeTab === 1 &&
        (active.isLoading ? (
          <Loader />
        ) : (
          <TeacherStatisticsContent
            data={active.data}
            isStudent={!role.teacher}
          />
        ))}
      {!role.teacher && activeTab === 2 && (archived.isLoading ? <Loader /> : <ArchivedStatistics data={archived.data} />)}
      {!role.teacher && <StatisticSubjects />}
    </PageWrapper>
  )
}
