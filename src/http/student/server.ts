import { cache } from 'react'

import { cookies } from 'next/headers'

import { serverFetch } from '@http/api'
import { serverFetchAuth } from '@http/authApi'

import { TCourseExam, TCourseStats, TLessonContent, TWishList } from './types'

const getLessonContent = cache(async (lesson_id: string) => {
  const isAuth = cookies().get('accessToken')?.value

  return await (isAuth ? serverFetchAuth : serverFetch)<TLessonContent>(`/courses/student/lecture/${lesson_id}/`, {
    next: {
      revalidate: 30,
      tags: ['lessonContent'],
    },
  })
})

const studentCourseStats = cache(
  async (course_id: string) =>
    await serverFetchAuth<TCourseStats>(`/courses/student/statistics/courses/?course_id=${course_id}`, {
      next: {
        revalidate: 30,
      },
    }),
)

const getExamContent = cache(async (exam_id: string) => {
  const isAuth = cookies().get('accessToken')?.value

  return await (isAuth ? serverFetchAuth : serverFetch)<TCourseExam>(`/courses/student/final_test/${exam_id}/`, {
    next: {
      revalidate: 30,
      tags: ['studentExam'],
    },
  })
})

const getWishList = cache(
  async () =>
    await serverFetchAuth<TWishList>('/courses/favorites/me/', {
      next: {
        revalidate: 0,
        tags: ['wishlist'],
      },
    }),
)

export { getLessonContent, studentCourseStats, getExamContent, getWishList }
