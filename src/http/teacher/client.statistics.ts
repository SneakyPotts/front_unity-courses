import { clientAuthFetch } from '@http/clientApi'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type { TTeacherCourseStats } from './types'

const getTeacherCourseStats = (course_id?: string) => clientAuthFetch<TTeacherCourseStats[]>(`/courses/teacher/statistics/${course_id}/`)
const setFinalMark = ({ course_id, student_id, mark }: { course_id: string; mark: number; student_id: string }) =>
  clientAuthFetch<any>(`/courses/teacher/statistics/${course_id}/set_final_mark/`, {
    method: 'PATCH',
    body: JSON.stringify([{ student_id: student_id, final_mark: mark }]),
  })

export function useQueryTeacherStats({ course_id }: { course_id?: string }) {
  const queryClient = useQueryClient()

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
    stats,
    finalMark,
  }
}
