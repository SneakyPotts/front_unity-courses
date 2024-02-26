import { cache } from 'react'

import { cookies } from 'next/headers'

import { serverFetch } from '@http/api'
import { serverFetchAuth } from '@http/authApi'

import type { TCatalog, TCourseDetail, TFilters, TFiltersResponse } from './type'

const getCoursesCatalog = cache(async (filters: string = '') => {
  const isAuth = cookies().get('accessToken')?.value

  return await (isAuth ? serverFetchAuth : serverFetch)<TCatalog>(`/courses/?${filters}`, {
    cache: 'reload',
  })
})

const getCoursesFilters = cache(async () => {
  const response = await serverFetch<TFiltersResponse>('/courses/filter_options/', {
    cache: 'reload',
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

  return await (isAuth ? serverFetchAuth : serverFetch)<TCourseDetail>(`/courses/${id}`, {
    cache: 'reload',
  })
})

export { getCoursesCatalog, getCoursesFilters, getCourseDetail }
