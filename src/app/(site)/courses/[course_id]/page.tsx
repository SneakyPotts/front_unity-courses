import type { TPageProps } from '@assets/types/globals'
import { getCourseDetail } from '@http/courses/server'

import { RequestError } from '_ui/RequestError'

import { CourseDetailContent } from '_content/CourseDetailContent'
import { PurchasedCourseDetailContent } from '_content/PurchasedCourseDetailContent'

export default async function CourseDetailPage({ params, searchParams }: TPageProps) {
  const { data, error } = await getCourseDetail(params.course_id as string)

  const isPurchase = !!data?.purchased

  if (error) return <RequestError message={error.message || 'Щось пішло не так...'} />

  return isPurchase ? <PurchasedCourseDetailContent data={data} /> : <CourseDetailContent data={data} />
}
