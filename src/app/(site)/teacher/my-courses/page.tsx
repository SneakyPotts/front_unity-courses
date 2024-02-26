'use client'

import React, { useState } from 'react'

import { useSetHeaderParams } from '@hooks/useSetHeaderParams'
import { useQueryStudentCourses } from '@http/student/client'
import { TStudentCourses } from '@http/student/types'

import { CourseCard } from '_ui/CourseCard'
import { Loader } from '_ui/Loader'
import { MyCoursesEmpty } from '_ui/MyCoursesEmpty'
import { RequestError } from '_ui/RequestError'
import { Tabs } from '_ui/Tabs'

export default function TeacherMyCourses() {
  const tabs = ['Активні', 'Архівні', 'Шаблони', 'Чернетка', 'Архів']

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
        {activeTab === 1 && <ActiveCoursesTab />}
        {activeTab === 2 && <UnderinspectionCoursesTab />}
        {activeTab === 3 && <TemplatesCoursesTab />}
        {activeTab === 4 && <DraftCoursesTab />}
        {activeTab === 5 && <ArchivedCoursesTab />}
      </div>
    </div>
  )
}

function ActiveCoursesTab() {
  const { active } = useQueryStudentCourses({ tab_id: 'active' })

  return <TabContent {...active} />
}

function UnderinspectionCoursesTab() {
  return <h2>1</h2>
}

function TemplatesCoursesTab() {
  return <h4>5</h4>
}

function DraftCoursesTab() {
  return <p>1</p>
}

function ArchivedCoursesTab() {
  return <p>1</p>
}

interface TabContentProps {
  data?: TStudentCourses
  isLoading: boolean
  isError: boolean
  isArchived?: boolean
}

function TabContent({ data, isLoading, isError, isArchived }: TabContentProps) {
  return (
    <>
      {isLoading && <Loader />}
      {isError && <RequestError message="Щось пішло не так..." />}
      {!!data &&
        (data?.results.length ? (
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
