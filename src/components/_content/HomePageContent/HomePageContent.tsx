'use client'

import classNames from 'classnames'
import React, { useState } from 'react'
import { useWindowSize } from 'usehooks-ts'

import { CoursesProgress } from '@components/CoursesProgress'
import { Recommended } from '@components/Recommended'
import { ScheduleDay } from '@components/ScheduleDay'
import { StatisticSubjects } from '@components/StatisticSubjects'
import { TestKnowledgeList } from '@components/TestKnowledgeList'
import { ToDoList } from '@components/ToDoList'
import { useSetHeaderParams } from '@hooks/useSetHeaderParams'

import { Banner } from '_ui/Banner'
import { Loader } from '_ui/Loader'
import { PageWrapper } from '_ui/PageWrapper'
import { Tabs } from '_ui/Tabs'

import type { HomePageContentProps } from './HomePageContent.props'

export default function HomePageContent({ role }: HomePageContentProps) {
  const { width } = useWindowSize()
  const isDesktop = width > 991

  const [activeTab, setActiveTab] = useState(0)

  useSetHeaderParams({ title: 'Головна' })

  if (!width) return <Loader />

  return (
    <PageWrapper
      aboveElement={
        <Tabs
          list={['Курси', 'Завдання', 'Прогрес курсів']}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      }
    >
      <section className="schedule">
        <div className="schedule__inner">
          {(isDesktop || activeTab === 1) && (
            <ScheduleDay
              schedule={{ data: [], isLoading: false, isError: false }}
              isTeacher={role.teacher}
              isStudent={role.student}
            />
          )}

          <div className="schedule__block"></div>

          {(isDesktop || activeTab === 2) && (
            <div className="schedule__block">
              <div className={classNames('todo', 'schedule__todo')}>
                {/*<UrgentTasks*/}
                {/*  list={{ data: [], isLoading: true, isError: true }}*/}
                {/*  isStudent={role.student}*/}
                {/*/>*/}

                <ToDoList />
              </div>
            </div>
          )}
        </div>
      </section>
      {!role.teacher && (
        <>
          <section className="statistics">
            <div className="statistics__inner">
              {isDesktop && (
                <StatisticSubjects
                  // studentId={'childID'}
                  isShort
                />
              )}
              {(isDesktop || activeTab === 3) && <CoursesProgress />}
            </div>
          </section>

          <Recommended />
        </>
      )}

      {isDesktop && role.teacher && (
        <>
          <TestKnowledgeList />

          <Banner isVertical={false} />
        </>
      )}
    </PageWrapper>
  )
}
