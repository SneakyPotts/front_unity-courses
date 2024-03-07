import { clientAuthFetch } from '@http/clientApi'
import type { TCourseDetail, TReviewItem } from '@http/courses/type'
import { useMutation, useQuery } from '@tanstack/react-query'

import type { TStudentProfileInfo } from './types'

const getStudentProfileInfo = async (student_id?: string) => await clientAuthFetch<TStudentProfileInfo>(`/detail/student/${student_id}`)

const getCourseInfo = async (course_id: string) => await clientAuthFetch<TCourseDetail>(`/courses/${course_id}/`)

const sendNewReview = async ({ course_id, ...data }: { course_id: string; rating: string | number; content: string }) =>
  await clientAuthFetch<TReviewItem>(`/courses/${course_id}/reviews/add/`, {
    method: 'POST',
    body: JSON.stringify(data),
  })

export function useQueryStudent({ student_id, course_id }: { student_id?: string; course_id?: string }) {
  const profile = useQuery({
    queryKey: [student_id],
    queryFn: () => getStudentProfileInfo(student_id),
    enabled: !!student_id,
  })

  const course = useQuery({
    queryKey: [course_id],
    queryFn: () => getCourseInfo(course_id!),
    enabled: !!course_id,
  })

  const { mutateAsync: addReview } = useMutation({
    mutationFn: sendNewReview,
  })

  return {
    profile,
    course,
    addReview,
  }
}
