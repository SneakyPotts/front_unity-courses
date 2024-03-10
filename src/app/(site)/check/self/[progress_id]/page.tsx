import React from 'react'

import dynamic from 'next/dynamic'

import { dynamicOptions } from '@assets/constants'
import type { TPageProps } from '@assets/types/globals'
import { LessonHeader } from '@components/LessonHeader'
import { getTeacherSelfProgress } from '@http/teacher/server'

import { AsideLesson } from '_ui/AsideLesson'
import { PageWrapper } from '_ui/PageWrapper'

const CheckSelfWorkContent = dynamic(() => import('_content/CheckSelfWorkContent').then((mod) => mod.CheckSelfWorkContent), {
  ...dynamicOptions,
  ssr: false,
})

export default async function CheckSelfWorkPage({ params }: TPageProps) {
  const { data } = await getTeacherSelfProgress(params.progress_id as string)

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
            <CheckSelfWorkContent data={data} />
          </div>
        </section>
      </PageWrapper>
    )
}
