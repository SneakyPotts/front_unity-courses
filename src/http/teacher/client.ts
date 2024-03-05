import { clientAuthFetch } from '@http/clientApi'
import type { TSimpleCourse, TTeacherCourseStats, TTeacherProfileInfo } from '@http/teacher/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const getTeacherProfileInfo = (teacher_id?: string) => clientAuthFetch<TTeacherProfileInfo>(`/detail/teacher/${teacher_id}`)

const getTeacherCourseStats = (course_id?: string) => clientAuthFetch<TTeacherCourseStats[]>(`/courses/teacher/statistics/${course_id}/`)
const getTeacherCoursesList = () => clientAuthFetch<TSimpleCourse[]>(`/courses/teacher/brief/`)

const setFinalMark = ({ course_id, student_id, mark }: { course_id: string; mark: number; student_id: string }) =>
  clientAuthFetch<any>(`/courses/teacher/statistics/${course_id}/set_final_mark/`, {
    method: 'PATCH',
    body: JSON.stringify([{ student_id: student_id, final_mark: mark }]),
  })

export function useQueryTeacher({ teacher_id, course_id, list }: { teacher_id?: string; course_id?: string; list?: boolean }) {
  const queryClient = useQueryClient()

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

  const stats = useQuery({
    queryKey: ['stats', course_id],
    queryFn: () => getTeacherCourseStats(course_id),
    enabled: !!course_id,
  })

  const { mutateAsync: finalMark } = useMutation({
    mutationFn: setFinalMark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stats'] })
    },
  })

  return {
    profile,
    courses,
    stats,
    finalMark,
  }
}
