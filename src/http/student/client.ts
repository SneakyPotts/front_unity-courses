import { clientAuthFetch } from '@http/clientApi'
import type { TCourseDetail, TReviewItem } from '@http/courses/type'
import { useMutation, useQuery } from '@tanstack/react-query'

import type { TStudentProfileInfo } from './types'

const roles = [
  {
    id: 2,
    title: 'Учень',
  },
  {
    id: 10,
    title: 'Батьківський аккаунт',
  },
  {
    id: 3,
    title: 'Студент курсу',
  },
]

const getStudentProfileInfo = async (student_id?: string) => await clientAuthFetch<TStudentProfileInfo>(`/detail/student/${student_id}`)
const getStudentModalInfo = async (student_id?: string, role?: number) => {
  let type = ''

  switch (role) {
    case 2:
      type = 'student'
      break
    case 3:
      type = 'external_student'
      break
    case 10:
      type = 'parent'
      break
    default:
      break
  }
  console.log('type', type, role)
  return await clientAuthFetch<TStudentProfileInfo>(`/detail/${type}/${student_id}`)
}

const getCourseInfo = async (course_id: string) => await clientAuthFetch<TCourseDetail>(`/courses/${course_id}/`)

const sendNewReview = async ({ course_id, ...data }: { course_id: string; rating: string | number; content: string }) =>
  await clientAuthFetch<TReviewItem>(`/courses/${course_id}/reviews/add/`, {
    method: 'POST',
    body: JSON.stringify(data),
  })

export function useQueryStudent({ student_id, role, course_id }: { student_id?: string; role?: number; course_id?: string }) {
  const profile = useQuery({
    queryKey: [student_id, role],
    queryFn: () => getStudentModalInfo(student_id, role),
    enabled: !!student_id && !!role,
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
