'use client'

import { MathJax } from 'better-react-mathjax'
import { addMinutes, isAfter } from 'date-fns'
import React, { useMemo, useState } from 'react'

import dynamic from 'next/dynamic'

import { dynamicOptions } from '@assets/constants'
import { useAssemblyContent } from '@hooks/useAssemblyContent'
import { useSetHeaderParams } from '@hooks/useSetHeaderParams'
import { useQueryStudentLesson } from '@http/student/client.lesson'

import { Button } from '_ui/Button'
import { Tabs } from '_ui/Tabs'

import { LessonPageContentProps } from './LessonPageContent.props'

const LessonsNavigation = dynamic(() => import('@components/LessonsNavigation').then((mod) => mod.LessonsNavigation), {
  ssr: false,
})
const SelfWorkTab = dynamic(() => import('./tabs/SelfWorkTab').then((mod) => mod.SelfWorkTab), {
  ...dynamicOptions,
  ssr: false,
})
const TeacherSelfWorkTab = dynamic(() => import('./tabs/TeacherSelfWorkTab').then((mod) => mod.TeacherSelfWorkTab), {
  ...dynamicOptions,
  ssr: false,
})
const TestWorkTab = dynamic(() => import('./tabs/TestWorkTab').then((mod) => mod.TestWorkTab), {
  ...dynamicOptions,
  ssr: false,
})
const TeacherTestWorkTab = dynamic(() => import('./tabs/TeacherTestWorkTab').then((mod) => mod.TeacherTestWorkTab), {
  ...dynamicOptions,
  ssr: false,
})

export function LessonPageContent({ data, role }: LessonPageContentProps) {
  const { visit } = useQueryStudentLesson({})

  const tabs = ['Конспект', ...(data?.self_education_work ? ['Самостійна робота'] : []), ...(data?.test ? ['Тест'] : [])]

  const is = useMemo(
    () => ({
      content: tabs.indexOf('Конспект') + 1,
      self: tabs.indexOf('Самостійна робота') + 1,
      test: tabs.indexOf('Тест') + 1,
    }),
    [data],
  )

  const formattedContent = useAssemblyContent(data?.content)

  const [activeTab, setActiveTab] = useState(1)
  const [isShowSubjectNav, setIsShowSubjectNav] = useState(false)

  const handleVisitLesson = () => {
    !role.teacher && data?.id && visit({ lesson_id: data.id })

    window.open(data?.online_lesson_link, '_blank')?.focus()
  }

  useSetHeaderParams({
    title: `Урок з ${data?.course_title}`,
    titleBefore: (
      <button
        className="header__manual"
        onClick={() => setIsShowSubjectNav((p) => !p)}
      >
        <svg className="header__manual-svg">
          <use href="/img/sprite.svg#list"></use>
        </svg>
      </button>
    ),
    titleAfter:
      data?.online_lesson_link &&
      (() => {
        const isEnded = isAfter(new Date(), addMinutes(new Date(data.start_time), 45))

        return (
          <Button
            variant={isEnded ? 'gray' : 'accent'}
            onClick={handleVisitLesson}
          >
            <svg className="btn__icon">
              <use href="/img/sprite.svg#check"></use>
            </svg>
            {isEnded ? `Урок ${('is_visited' in data && data.is_visited) || role.teacher ? 'пройшов' : 'пропущено'}` : 'Посилання на онлайн урок'}
          </Button>
        )
      })(),
    headerClassName: role.teacher ? 'header__container--lesson' : '',
  })

  return (
    <>
      <Tabs
        className={'add-here-some-className-Artem'}
        list={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isBig
      />
      {activeTab === is.content && (
        <div
          className={'courses-lesson__body'}
          style={{ userSelect: 'none' }}
        >
          <MathJax>
            <div className="lesson-section__text">{formattedContent}</div>
          </MathJax>
        </div>
      )}

      {activeTab === is.self && (role.teacher ? <TeacherSelfWorkTab selfId={data?.self_education_work} /> : <SelfWorkTab selfId={data?.self_education_work} />)}

      {activeTab === is.test && (role.teacher ? <TeacherTestWorkTab testId={data?.test} /> : <TestWorkTab testId={data?.test} />)}

      {isShowSubjectNav && data?.course_id && (
        <LessonsNavigation
          courseId={data.course_id!}
          onClose={() => setIsShowSubjectNav(false)}
        />
      )}
    </>
  )
}
