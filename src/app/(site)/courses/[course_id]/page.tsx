import { cookies } from 'next/headers'

import type { TPageProps } from '@assets/types/globals'
import { getCourseDetail } from '@http/courses/server'

import { RequestError } from '_ui/RequestError'

import { CourseDetailContent } from '_content/CourseDetailContent'

export default async function CourseDetailPage({ params, searchParams }: TPageProps) {
  const isAuth = cookies().get('accessToken')

  const { data, error } = await getCourseDetail(params.course_id as string, !!isAuth)

  if (error) return <RequestError message="Щось пішло не так..." />

  return <CourseDetailContent data={data} />
}
