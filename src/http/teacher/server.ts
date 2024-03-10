import { cache } from 'react'

import { serverFetchAuth } from '@http/authApi'
import type { TCourseDetail } from '@http/courses/type'

import { TSelfProgress, TTeacherContent, TTestProgress } from './types'

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

const getTeacherSelfProgress = cache(
  async (progress_id: string) =>
    await serverFetchAuth<TSelfProgress>(`/courses/teacher/work/progress/${progress_id}/`, {
      next: {
        revalidate: 30,
        tags: ['selfProgress'],
      },
    }),
)

const getTeacherTestProgress = cache(
  async (progress_id: string) =>
    await serverFetchAuth<TTestProgress>(`/courses/teacher/test/progress/${progress_id}/`, {
      next: {
        revalidate: 30,
        tags: ['testProgress'],
      },
    }),
)

export { getTeacherCourseDetail, getTeacherLessonContent, getTeacherSelfProgress, getTeacherTestProgress }
