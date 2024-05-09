import { cache } from 'react'

import { cookies } from 'next/headers'

import { serverFetch } from '@http/api'
import { serverFetchAuth } from '@http/authApi'

import type { TCatalog, TCourseDetail, TCourseReview, TFilters, TFiltersResponse } from './type'

const getCoursesCatalog = cache(async (filters: string = '') => {
  const isAuth = cookies().get('accessToken')?.value

  return await (isAuth ? serverFetchAuth : serverFetch)<TCatalog>(`/courses/?page_size=12&${filters}`, {
    next: {
      revalidate: 30,
      tags: ['catalog'],
    },
  })
})

const getCoursesFilters = cache(async () => {
  const response = await serverFetch<TFiltersResponse>('/courses/filter_options/', {
    next: {
      revalidate: 30,
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
      revalidate: 30,
      tags: ['courseDetail'],
    },
  })
})

const getCourseReviews = async ({ course_id, page = '1' }: { course_id: string; page?: string }) => {
  const isAuth = cookies().get('accessToken')?.value

  return await (isAuth ? serverFetchAuth : serverFetch)<TCourseReview>(`/courses/${course_id}/reviews/?page_size=5&page=${page}`, {
    next: {
      revalidate: 0,
    },
  })
}

export { getCoursesCatalog, getCoursesFilters, getCourseDetail, getCourseReviews }
