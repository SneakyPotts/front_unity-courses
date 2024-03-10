import { clientAuthFetch } from '@http/clientApi'
import { useQuery } from '@tanstack/react-query'

import { TArchivedCoursesStats, TCourseStats, TMarksCoursesStats } from './types'

const getStudentCourseStatistics = (course_id?: string) => clientAuthFetch<TCourseStats>(`/courses/student/statistics/courses/?course_id=${course_id || ''}`)
const getStudentActiveStatistics = () => clientAuthFetch<TMarksCoursesStats[]>(`/courses/student/statistics/`)
const getStudentArchivedStatistics = () => clientAuthFetch<TArchivedCoursesStats[]>(`/courses/student/statistics/archived/`)

export function useQueryStudentStats({ course_id, tab_id }: { course_id?: string; tab_id: string }) {
  const stats = useQuery({
    queryKey: [course_id],
    queryFn: () => getStudentCourseStatistics(course_id),
    enabled: tab_id === 'common',
  })

  const active = useQuery({
    queryKey: ['activeStats'],
    queryFn: () => getStudentActiveStatistics(),
    enabled: tab_id === 'active',
  })

  const archived = useQuery({
    queryKey: ['archivedStats'],
    queryFn: () => getStudentArchivedStatistics(),
    enabled: tab_id === 'archived',
  })

  return {
    stats,
    active,
    archived,
  }
}
