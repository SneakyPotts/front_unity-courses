import React from 'react'

import dynamic from 'next/dynamic'

import { dynamicOptions } from '@assets/constants'
import type { TPageProps } from '@assets/types/globals'
import { LessonHeader } from '@components/LessonHeader'
import { getTeacherTestProgress } from '@http/teacher/server'

import { AsideLesson } from '_ui/AsideLesson'
import { PageWrapper } from '_ui/PageWrapper'

const CheckTestWorkContent = dynamic(() => import('_content/CheckTestWorkContent').then((mod) => mod.CheckTestWorkContent), {
  ...dynamicOptions,
  ssr: false,
})

export default async function CheckTestWorkPage({ params }: TPageProps) {
  const { data } = await getTeacherTestProgress(params.progress_id as string)

  if (data)
    return (
      <PageWrapper>
        <section className="courses-lesson">
          <div className="courses-lesson__inner">
            <LessonHeader
              data={data}
              isCheckWork
            />
            <AsideLesson
              humans={[data.student]}
              isStudent
            />
            <CheckTestWorkContent data={data} />
          </div>
        </section>
      </PageWrapper>
    )
}
