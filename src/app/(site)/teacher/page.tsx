'use client'

import { useState } from 'react'
import { useWindowSize } from 'usehooks-ts'

import { CoursesProgress } from '@components/CoursesProgress'
import { ScheduleDay } from '@components/ScheduleDay'
import { StatisticSubjects } from '@components/StatisticSubjects'
import { ToDoList } from '@components/ToDoList'
import { MyCoursesEmpty } from '@components/_ui/MyCoursesEmpty'

import { Banner } from '_ui/Banner'
import { PageWrapper } from '_ui/PageWrapper'
import { Tabs } from '_ui/Tabs'

export default function TeacherHomePage({}: {}) {
  const { width } = useWindowSize()
  const isDesktop = width > 991
  const [activeTab, setActiveTab] = useState(0)

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
      {/*TODO: условие отображения todo. Если у учителя создано хотя бы один курс или шаблон,тогда отображем. Если не чего нет , то только MyCoursesEmpty*/}

      <section className="schedule">
        <div className="schedule__inner">
          {(isDesktop || activeTab === 1) && (
            <ScheduleDay
              schedule={{ data: [], isLoading: false, isError: false }}
              isTeacher={true}
              isStudent={true}
            />
          )}

          <div className="schedule__block"></div>
          <div className="schedule__block">
            <div className={'todo schedule__todo'}>
              {/*<UrgentTasks*/}
              {/*  list={{ data: [], isLoading: true, isError: true }}*/}
              {/*  isStudent={role.student}*/}
              {/*/>*/}

              <ToDoList />
            </div>
          </div>
        </div>
      </section>
      <section className="statistics">
        <div className="statistics__inner">
          <StatisticSubjects isShort />
          <CoursesProgress />
        </div>
      </section>
      <Banner isVertical={false} />
      {/* <MyCoursesEmpty /> */}
    </PageWrapper>
  )
}
