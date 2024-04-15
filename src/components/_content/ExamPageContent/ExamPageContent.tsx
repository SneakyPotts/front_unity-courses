'use client'

import React, { useMemo, useState } from 'react'

import { LessonsNavigation } from '@components/LessonsNavigation'
import { useSetHeaderParams } from '@hooks/useSetHeaderParams'

import { Tabs } from '_ui/Tabs'

import type { ExamPageContentProps } from './ExamPageContent.props'
import { ExamContentTab } from './tabs/ExamContentTab'
import { ExamTestTab } from './tabs/ExamTestTab'

export function ExamPageContent({ exam }: ExamPageContentProps) {
  const tabs = [/*'Конспект',*/ 'Контрольна робота']

  const is = useMemo(
    () => ({
      content: tabs.indexOf('Конспект') + 1,
      exam: tabs.indexOf('Контрольна робота') + 1,
    }),
    [],
  )

  const [activeTab, setActiveTab] = useState(1)
  const [isShowSubjectNav, setIsShowSubjectNav] = useState(false)

  useSetHeaderParams({
    title: `Контрольна робота`,
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
  })

  return (
    <>
      <Tabs
        list={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isBig
      />

      {activeTab === is.content && <ExamContentTab />}

      {activeTab === is.exam && <ExamTestTab {...exam} />}

      {isShowSubjectNav && exam.course_id && (
        <LessonsNavigation
          courseId={exam.course_id}
          onClose={() => setIsShowSubjectNav(false)}
        />
      )}
    </>
  )
}
