import { clientAuthFetch } from '@http/clientApi'
import { useQuery } from '@tanstack/react-query'

import { TArchivedCoursesStats, TCourseStats, TMarksCoursesStats } from './types'

const getStudentCourseStatistics = (course_id?: string, student_id?: string) =>
  clientAuthFetch<TCourseStats>(`/courses/student/statistics/courses/?course_id=${course_id || ''}${student_id ? `&student_id=${student_id}` : ''}`)
const getStudentActiveStatistics = (student_id?: string) =>
  clientAuthFetch<TMarksCoursesStats[]>(`/courses/student/statistics/${student_id ? `?student_id=${student_id}` : ''}`)
const getStudentArchivedStatistics = (student_id?: string) =>
  clientAuthFetch<TArchivedCoursesStats[]>(`/courses/student/statistics/archived/${student_id ? `?student_id=${student_id}` : ''}`)

export function useQueryStudentStats({ course_id, student_id, tab_id }: { course_id?: string; student_id?: string; tab_id: string }) {
  const stats = useQuery({
    queryKey: [course_id],
    queryFn: () => getStudentCourseStatistics(course_id),
    enabled: tab_id === 'common',
  })

  const active = useQuery({
    queryKey: ['activeStats', student_id],
    queryFn: () => getStudentActiveStatistics(student_id),
    enabled: tab_id === 'active',
  })

  const archived = useQuery({
    queryKey: ['archivedStats', student_id],
    queryFn: () => getStudentArchivedStatistics(student_id),
    enabled: tab_id === 'archived',
  })

  return {
    stats,
    active,
    archived,
  }
}
