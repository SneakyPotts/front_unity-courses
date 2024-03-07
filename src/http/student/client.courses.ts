import { clientAuthFetch } from '@http/clientApi'
import { useQuery } from '@tanstack/react-query'

import type { TStudentCourses } from './types'

const getStudentCoursesActive = ({ page = 1 }: { page?: number }) => clientAuthFetch<TStudentCourses>(`/courses/student/active/?page=${page}`)

const getStudentCoursesArchived = ({ page = 1 }: { page?: number }) => clientAuthFetch<TStudentCourses>(`/courses/student/archived/?page=${page}`)

export function useQueryStudentCourses({ tab_id, page }: { tab_id: string; page?: number }) {
  const active = useQuery({
    queryKey: ['active', page],
    queryFn: () => getStudentCoursesActive({ page }),
    enabled: tab_id === 'active',
  })

  const archived = useQuery({
    queryKey: ['archived', page],
    queryFn: () => getStudentCoursesArchived({ page }),
    enabled: tab_id === 'archived',
  })

  return {
    active,
    archived,
  }
}
