'use client'

import React, { useMemo, useState } from 'react'

import { CourseTemplateCard } from '@components/CourseTemplateCard'
import { useSetHeaderParams } from '@hooks/useSetHeaderParams'
import { useQueryStudentCourses } from '@http/student/client.courses'
import { useQueryTeacherCourses } from '@http/teacher/client.courses'

import { AppPagination } from '_ui/AppPagination'
import { CourseCard } from '_ui/CourseCard'
import { Loader } from '_ui/Loader'
import { MyCoursesEmpty } from '_ui/MyCoursesEmpty'
import { RequestError } from '_ui/RequestError'
import { Tabs } from '_ui/Tabs'

import type { MyCoursesContentProps, TabContentProps } from './MyCoursesContent.props'

export function MyCoursesContent({ role }: MyCoursesContentProps) {
  const tabs = useMemo(() => ['Активні', ...(role.teacher ? ['На модерації', 'Шаблони', 'Чернетка'] : []), 'Архівні'], [role.teacher])

  const is = useMemo(
    () => ({
      active: tabs.indexOf('Активні') + 1,
      moderate: tabs.indexOf('На модерації') + 1,
      template: tabs.indexOf('Шаблони') + 1,
      draft: tabs.indexOf('Чернетка') + 1,
      archive: tabs.indexOf('Архівні') + 1,
    }),
    [tabs],
  )

  const [activeTab, setActiveTab] = useState(1)

  useSetHeaderParams({ title: 'Мої курси' })

  return (
    <div className={'my-catalog__courses'}>
      <Tabs
        list={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isStatic
      />
      <div className={'my-catalog__active'}>
        {activeTab === is.active && <ActiveCoursesTab role={role} />}
        {activeTab === is.moderate && <OnModerateCoursesTab />}
        {activeTab === is.archive && <ArchivedCoursesTab role={role} />}
      </div>
    </div>
  )
}

function ActiveCoursesTab({ role }: { role: { teacher: boolean; student: boolean; parent: boolean } }) {
  const [page, setPage] = useState(1)

  const { active: activeStudent } = useQueryStudentCourses({ tab_id: !role.teacher ? 'active' : '', page })
  const { active: activeTeacher } = useQueryTeacherCourses({ tab_id: role.teacher ? 'active' : '', page })

  const active = role.teacher ? activeTeacher : activeStudent

  return (
    <>
      <TabContent {...active} />
      <AppPagination
        total={active.data?.count}
        pageSize={5}
        current={page}
        onChange={setPage}
      />
    </>
  )
}

function OnModerateCoursesTab() {
  return <CourseTemplateCard />
}

function ArchivedCoursesTab({ role }: { role: { teacher: boolean; student: boolean; parent: boolean } }) {
  const [page, setPage] = useState(1)

  const { archived } = useQueryStudentCourses({ tab_id: !role.teacher ? 'archived' : '', page })

  return (
    <>
      <TabContent
        {...archived}
        isArchived
      />
      <AppPagination
        total={archived.data?.count}
        pageSize={5}
        current={page}
        onChange={setPage}
      />
    </>
  )
}
function TabContent({ data, isLoading, isError, isArchived }: TabContentProps) {
  return (
    <>
      {isLoading && <Loader />}
      {isError && <RequestError message="Щось пішло не так..." />}
      {!!data &&
        (!!data?.results.length ? (
          data?.results.map((course) => (
            <CourseCard
              key={course.id}
              {...course}
              isArchived={isArchived}
            />
          ))
        ) : (
          <MyCoursesEmpty />
        ))}
    </>
  )
}
