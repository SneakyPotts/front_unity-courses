import type { TPageProps } from '@assets/types/globals'
import { aboutMeRequest } from '@http/profile/server'
import { getLessonContent } from '@http/student/server'
import { getTeacherLessonContent } from '@http/teacher/server'

import { RequestError } from '_ui/RequestError'

import { LessonPageContent } from '_content/LessonPageContent'

export default async function LessonPage({ params }: TPageProps) {
  const { data: me } = await aboutMeRequest()
  const role = {
    teacher: me?.role === 20,
    student: me?.role === 2,
    parent: me?.role === 10,
  }

  const { data, error } = await (role.teacher ? getTeacherLessonContent : getLessonContent)(params.lesson_id as string)

  if (error) return <RequestError {...error} />

  return (
    <LessonPageContent
      data={data}
      role={role}
    />
  )
}
