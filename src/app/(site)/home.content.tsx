'use client'

import classNames from 'classnames'
import React, { useContext, useState } from 'react'
import { useWindowSize } from 'usehooks-ts'

import { appContext } from '@components/Context/context'
import { ScheduleDay } from '@components/ScheduleDay'

import { Button } from '@UI/Button'
import { Loader } from '@UI/Loader'
import { PageWrapper } from '@UI/PageWrapper'

import { useSetHeaderParams } from '@hooks/useSetHeaderParams'

export function HomeContent() {
  const { profile } = useContext(appContext)
  const isTeacher = profile?.role === 20
  const isParent = profile?.role === 10
  const isStudent = profile?.role === 2

  const { width } = useWindowSize()
  const isDesktop = width > 991

  const [activeTab, setActiveTab] = useState(0)

  useSetHeaderParams({ title: 'Головна' })

  if (!profile) return <Loader />

  return (
    <PageWrapper
      list={['Курси', 'Завдання', 'Прогресс']}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >
      <section className="schedule">
        <div className="schedule__inner">
          <p>ScheduleDay</p>
          {/*{(isDesktop || activeTab === 1) && (*/}
          {/*  <ScheduleDay*/}
          {/*    // schedule={isTeacher ? teacherSchedule : studentSchedule || parentSchedule}*/}
          {/*    schedule={}*/}
          {/*    isTeacher={isTeacher}*/}
          {/*    isStudent={isStudent}*/}
          {/*  />*/}
          {/*)}*/}

          {/*TODO: COURSES list*/}
          {(isDesktop || activeTab === 2) && <div className="schedule__block"></div>}

          {(isDesktop || activeTab === 3) && (
            <div className="schedule__block">
              <p>В календар</p>
              {/*<CustomLink*/}
              {/*  className={'schedule__link schedule__link--todo'}*/}
              {/*  href={'/schedule'}*/}
              {/*>*/}
              {/*  В календар*/}
              {/*  <svg>*/}
              {/*    <use href="/img/sprite.svg#arrow-right"></use>*/}
              {/*  </svg>*/}
              {/*</CustomLink>*/}

              <div className={classNames('todo', 'schedule__todo')}>
                <p>ToDoList</p>
                {/*<UrgentTasks*/}
                {/*  list={isTeacher ? teacherImportantData : importantData}*/}
                {/*  isStudent={isStudent}*/}
                {/*/>*/}

                {/*{!isParent && <ToDoList />}*/}
              </div>
            </div>
          )}
        </div>
      </section>

      <br />
      <h1>HELLO, WORLD!</h1>
      <br />
      <Button href="courses">COURSES</Button>
      <br />
      <Button href="courses/detail">COURSES detail</Button>
      <br />
      <Button href="courses/lesson">COURSES lesson</Button>
      <br />
      <Button href="courses/my">COURSES my</Button>
      <br />
      <Button href="courses/archive">COURSES archive</Button>
    </PageWrapper>
  )
}
