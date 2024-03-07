import type { TPageProps } from '@assets/types/globals'
import { getCourseDetail, getTeacherCourseDetail } from '@http/courses/server'
import { aboutMeRequest } from '@http/profile/server'

import { RequestError } from '_ui/RequestError'

import { CourseDetailContent } from '_content/CourseDetailContent'
import { PurchasedCourseDetailContent } from '_content/PurchasedCourseDetailContent'

export default async function CourseDetailPage({ params, searchParams }: TPageProps) {
  const { data: me } = await aboutMeRequest()
  const role = {
    teacher: me?.role === 20,
    student: me?.role === 2,
    parent: me?.role === 10,
  }

  const { data, error } = await (role.teacher ? getTeacherCourseDetail : getCourseDetail)(params.course_id as string)

  const isPurchase = !!data?.purchased || role.teacher

  if (error) return <RequestError message={error.message || 'Щось пішло не так...'} />

  return isPurchase ? <PurchasedCourseDetailContent data={data} /> : <CourseDetailContent data={data} />
}
