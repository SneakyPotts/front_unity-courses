'use client'

import React, { useState } from 'react'

import { Banner } from '@/components/_ui/Banner'
import { TeacherCardLesson } from '@components/TeacherCardLesson'
import { lector } from '@components/TeacherCardLesson'
import { useSetHeaderParams } from '@hooks/useSetHeaderParams'
import { useQueryStudentCourses } from '@http/student/client.courses'
import type { TStudentCourses } from '@http/student/types'

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
    <div className={'content'}>
      <div className={'content__container container'}>
        <section className={'teacher-course'}>
          <div className="teacher-course__content">
            <Tabs
              list={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isStatic
              element={
                <button className={'teacher-course__create'}>
                  <svg>
                    <use href="/img/sprite.svg#plus"></use>
                  </svg>
                  створити шаблон
                </button>
              }
            />
            <div className={'teacher-course__element'}>
              {activeTab === 1 && <ActiveCoursesTab />}
              {activeTab === 2 && <UnderinspectionCoursesTab />}
              {activeTab === 3 && <TemplatesCoursesTab />}
              {activeTab === 4 && <DraftCoursesTab />}
              {activeTab === 5 && <ArchivedCoursesTab />}
            </div>
          </div>

          <div className={'teacher-course__banner'}>
            <Banner />
          </div>
        </section>
      </div>
    </div>
  )
}

function ActiveCoursesTab() {
  const { active } = useQueryStudentCourses({ tab_id: 'active' })

  return <TabContent {...active} />
}

function UnderinspectionCoursesTab() {
  return <TeacherCardLesson lecturer={lector} />
}

function TemplatesCoursesTab() {
  return (
    <div>
      <p>TemplatesCoursesTab</p>
    </div>
  )
}

function DraftCoursesTab() {
  return (
    <div>
      <p>DraftCoursesTab</p>
    </div>
  )
}

function ArchivedCoursesTab() {
  return (
    <div>
      <p>ArchivedCoursesTab</p>
    </div>
  )
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
