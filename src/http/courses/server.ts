import { cache } from 'react'

import { cookies } from 'next/headers'

import { serverFetch } from '@http/api'
import { serverFetchAuth } from '@http/authApi'

import { TCatalog, TCourseDetail, TCourseReview, TFilters, TFiltersResponse, TLessonContent } from './type'

const getCoursesCatalog = cache(async (filters: string = '') => {
  const isAuth = cookies().get('accessToken')?.value

  return await (isAuth ? serverFetchAuth : serverFetch)<TCatalog>(`/courses/?${filters}`, {
    next: {
      revalidate: 3600,
    },
  })
})

const getCoursesFilters = cache(async () => {
  const response = await serverFetch<TFiltersResponse>('/courses/filter_options/', {
    next: {
      revalidate: 3600,
    },
  })

  if (response.error) return { ...response, data: undefined }

  return {
    data: [
      {
        title: 'Теми',
        name: 'categories',
        filters: response.data?.categories.map((v) => ({
          id: v.id,
          title: v.title,
          value: v.id,
        })),
      },
      {
        title: 'Цільова аудиторія',
        name: 'target_audiences',
        filters: response.data?.target_audiences.map((v) => ({
          id: v.id,
          title: v.title,
          value: v.id,
        })),
        extraClass: 'courses-catalog__class',
      },
    ] as TFilters,
    error: null,
  }
})

const getCourseDetail = cache(async (id: string) => {
  const isAuth = cookies().get('accessToken')?.value

  return await (isAuth ? serverFetchAuth : serverFetch)<TCourseDetail>(`/courses/${id}/`, {
    next: {
      revalidate: 3600,
    },
  })
})

const getLessonContent = cache(
  async (lesson_id: string) =>
    await serverFetchAuth<TLessonContent>(`/courses/student/lecture/${lesson_id}/`, {
      next: {
        revalidate: 3600,
      },
    }),
)

const getCourseReviews = async (course_id: string) => {
  const isAuth = cookies().get('accessToken')?.value

  return await (isAuth ? serverFetchAuth : serverFetch)<TCourseReview>(`/courses/${course_id}/reviews/`, {
    next: {
      revalidate: 0,
    },
  })
}

export { getCoursesCatalog, getCoursesFilters, getCourseDetail, getLessonContent, getCourseReviews }
