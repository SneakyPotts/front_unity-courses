import { cache } from 'react'

import { serverFetchAuth } from '@http/authApi'
import type { TCourseDetail } from '@http/courses/type'

import type { TTeacherContent } from './types'

const getTeacherCourseDetail = cache(
  async (id: string) =>
    await serverFetchAuth<TCourseDetail>(`/courses/teacher/${id}/`, {
      next: {
        revalidate: 30,
      },
    }),
)

const getTeacherLessonContent = cache(
  async (lesson_id: string) =>
    await serverFetchAuth<TTeacherContent>(`/courses/teacher/lecture/${lesson_id}/`, {
      next: {
        revalidate: 30,
      },
    }),
)

export { getTeacherCourseDetail, getTeacherLessonContent }
