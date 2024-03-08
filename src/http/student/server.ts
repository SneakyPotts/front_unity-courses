import { cache } from 'react'

import { serverFetchAuth } from '@http/authApi'
import type { TCourseStats, TLessonContent } from '@http/student/types'

const getLessonContent = cache(
  async (lesson_id: string) =>
    await serverFetchAuth<TLessonContent>(`/courses/student/lecture/${lesson_id}/`, {
      next: {
        revalidate: 30,
      },
    }),
)

const studentCourseStats = cache(
  async (course_id: string) =>
    await serverFetchAuth<TCourseStats>(`/courses/student/statistics/courses/?course_id=${course_id}`, {
      next: {
        revalidate: 30,
      },
    }),
)

export { getLessonContent, studentCourseStats }
