import { assemblyReqParams } from '@assets/utils'
import { clientAuthFetch } from '@http/clientApi'
import { useQuery } from '@tanstack/react-query'

import { TArchivedCoursesStats, TCourseStats, TMarksCoursesStats } from './types'

const getStudentCoursesBrief = async (student_id?: string) => {
  const reqParams = assemblyReqParams({ student_id })

  return await clientAuthFetch<
    Array<{
      id: string
      title: string
    }>
  >(`/courses/brief/${reqParams}`)
}

const getStudentCourseStatistics = async (course_id?: string, student_id?: string) => {
  const reqParams = assemblyReqParams({ course_id, student_id })

  return await clientAuthFetch<TCourseStats>(`/courses/student/statistics/courses/${reqParams}`)
}

const getStudentActiveStatistics = async (student_id?: string) => {
  const reqParams = assemblyReqParams({ student_id })

  return await clientAuthFetch<TMarksCoursesStats[]>(`/courses/student/statistics/${reqParams}`)
}

const getStudentArchivedStatistics = async (student_id?: string) => {
  const reqParams = assemblyReqParams({ student_id })

  return await clientAuthFetch<TArchivedCoursesStats[]>(`/courses/student/statistics/archived/${reqParams}`)
}

export function useQueryStudentStats({ course_id, student_id, tab_id }: { course_id?: string; student_id?: string; tab_id: string }) {
  const brief = useQuery({
    queryKey: ['brief', student_id],
    queryFn: () => getStudentCoursesBrief(student_id),
    enabled: tab_id === 'common',
  })

  const stats = useQuery({
    queryKey: ['stats', course_id, student_id],
    queryFn: () => getStudentCourseStatistics(course_id, student_id),
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
    brief,
    stats,
    active,
    archived,
  }
}
