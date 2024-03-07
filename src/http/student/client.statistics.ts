import { clientAuthFetch } from '@http/clientApi'
import { useQuery } from '@tanstack/react-query'

import type { TCourseStats } from './types'

const getStudentCourseStatistics = (course_id?: string) => clientAuthFetch<TCourseStats>(`/courses/student/statistics/courses/?course_id=${course_id || ''}`)

export function useQueryStudentStats({ course_id }: { course_id?: string }) {
  const stats = useQuery({
    queryKey: [course_id],
    queryFn: () => getStudentCourseStatistics(course_id),
  })

  return {
    stats,
  }
}
