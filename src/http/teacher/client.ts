import { clientAuthFetch } from '@http/clientApi'
import type { TReviewItem } from '@http/courses/type'
import { useMutation, useQuery } from '@tanstack/react-query'

import type { TSimpleCourse, TTeacherProfileInfo } from './types'

const getTeacherProfileInfo = (teacher_id?: string) => clientAuthFetch<TTeacherProfileInfo>(`/detail/teacher/${teacher_id}`)
const getTeacherCoursesList = () => clientAuthFetch<TSimpleCourse[]>(`/courses/teacher/brief/`)

const sendReviewReply = ({ course_id, ...data }: { course_id: string; review_id: string | number; content: string }) =>
  clientAuthFetch<TReviewItem>(`/courses/${course_id}/reviews/reply/`, {
    method: 'POST',
    body: JSON.stringify(data),
  })

export function useQueryTeacher({ teacher_id, list = false }: { teacher_id?: string; list?: boolean }) {
  const profile = useQuery({
    queryKey: [teacher_id],
    queryFn: () => getTeacherProfileInfo(teacher_id),
    enabled: !!teacher_id,
  })

  const courses = useQuery({
    queryKey: ['coursesList'],
    queryFn: () => getTeacherCoursesList(),
    enabled: list,
  })

  const { mutateAsync: addReviewReply } = useMutation({
    mutationFn: sendReviewReply,
  })

  return {
    profile,
    courses,
    addReviewReply,
  }
}
