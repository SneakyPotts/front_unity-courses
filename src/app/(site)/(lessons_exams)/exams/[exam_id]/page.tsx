import React from 'react'

import type { TPageProps } from '@assets/types/globals'
import { aboutMeRequest } from '@http/profile/server'
import { getExamContent } from '@http/student/server'
import { getTeacherExam } from '@http/teacher/server'

import { LessonWrapper } from '_ui/LessonWrapper'
import { RequestError } from '_ui/RequestError'

import { ExamPageContent } from '_content/ExamPageContent'

export default async function ExamPage({ params }: TPageProps) {
  const { data: me } = await aboutMeRequest()
  const role = {
    teacher: me?.role === 20,
    student: me?.role === 2,
    parent: me?.role === 10,
  }

  const { data, error } = await (role.teacher ? getTeacherExam : getExamContent)(params.exam_id as string)

  if (error) return <RequestError {...error} />

  if (data)
    return (
      <LessonWrapper
        data={{
          title: data?.title,
          course_title: 'course_title',
          topic_title: data?.course_title,
          course_icon: data?.course_icon,
          course_color: data?.course_color,
        }}
        aside={{
          lectors: data?.lectors,
          isTeacher: role.teacher,
        }}
      >
        <ExamPageContent
          exam={data}
          role={role}
        />
      </LessonWrapper>
    )
}
