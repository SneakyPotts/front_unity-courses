import React from 'react'

import type { TPageProps } from '@assets/types/globals'
import { LessonHeader } from '@components/LessonHeader'
import { getTeacherExamProgress } from '@http/teacher/server'

import { AsideLesson } from '_ui/AsideLesson'
import { PageWrapper } from '_ui/PageWrapper'
import { RequestError } from '_ui/RequestError'

import { CheckExamContent } from '_content/CheckExamContent'

export default async function CheckTestWorkPage({ params }: TPageProps) {
  const { data, error } = await getTeacherExamProgress(params.progress_id as string)

  if (error) return <RequestError {...error} />

  if (data)
    return (
      <PageWrapper>
        <section className="courses-lesson">
          <div className="courses-lesson__inner">
            <LessonHeader
              data={{
                title: 'Фінальний тест',
                topic_title: data.course_title,
                course_title: '',
                course_color: data.course_color,
                course_icon: data.course_icon,
              }}
              isCheckWork
            />
            <AsideLesson
              humans={[data.student]}
              isStudent
            />
            <CheckExamContent exam={data} />
          </div>
        </section>
      </PageWrapper>
    )
}
