import React from 'react'

import type { TPageProps } from '@assets/types/globals'
import { LessonHeader } from '@components/LessonHeader'
import { getTeacherTestProgress } from '@http/teacher/server'

import { AsideLesson } from '_ui/AsideLesson'
import { PageWrapper } from '_ui/PageWrapper'
import { RequestError } from '_ui/RequestError'

import { CheckTestWorkContent } from '_content/CheckTestWorkContent'

export default async function CheckTestWorkPage({ params }: TPageProps) {
  const { data, error } = await getTeacherTestProgress(params.progress_id as string)

  if (error) return <RequestError {...error} />

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
