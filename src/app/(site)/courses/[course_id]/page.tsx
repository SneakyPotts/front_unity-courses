import type { TPageProps } from '@assets/types/globals'
import { getCourseDetail } from '@http/courses/server'
import { aboutMeRequest } from '@http/profile/server'
import { getTeacherCourseDetail } from '@http/teacher/server'

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

  if (error) return <RequestError {...error} />

  return isPurchase ? <PurchasedCourseDetailContent data={data} /> : <CourseDetailContent data={data} />
}
