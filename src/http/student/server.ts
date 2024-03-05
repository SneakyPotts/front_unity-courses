import { cache } from 'react'

import { serverFetchAuth } from '@http/authApi'
import type { TCourseStats } from '@http/student/types'

const studentCourseStats = cache(
  async (course_id: string) =>
    await serverFetchAuth<TCourseStats>(`/courses/student/statistics/courses/?course_id=${course_id}`, {
      next: {
        revalidate: 60,
      },
    }),
)

export { studentCourseStats }
