import { cache } from 'react'

import { serverFetchAuth } from '@http/authApi'
import type { TCourseDetail } from '@http/courses/type'

import { TExamTotal, TSelfProgress, TTeacherContent, TTeacherExamProgress, TTestProgress } from './types'

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

const getTeacherExam = cache(
  async (exam_id: string) =>
    await serverFetchAuth<TExamTotal>(`/courses/teacher/final_test/${exam_id}/`, {
      next: {
        revalidate: 30,
        tags: ['teacherExam'],
      },
    }),
)

const getTeacherExamProgress = cache(
  async (progress_id: string) =>
    await serverFetchAuth<TTeacherExamProgress>(`/courses/teacher/final_test/progress/${progress_id}/`, {
      next: {
        revalidate: 30,
        tags: ['examProgress'],
      },
    }),
)

export { getTeacherCourseDetail, getTeacherLessonContent, getTeacherSelfProgress, getTeacherTestProgress, getTeacherExam, getTeacherExamProgress }
