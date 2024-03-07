import { clientAuthFetch } from '@http/clientApi'
import type { TStudentCourses } from '@http/student/types'
import { useQuery } from '@tanstack/react-query'

const getTeacherCoursesActive = ({ page = 1 }: { page?: number }) => clientAuthFetch<TStudentCourses>(`/courses/teacher/?page=${page}`)

export function useQueryTeacherCourses({ tab_id, page }: { tab_id: string; page?: number }) {
  const active = useQuery({
    queryKey: ['active', page],
    queryFn: () => getTeacherCoursesActive({ page }),
    enabled: tab_id === 'active',
  })

  return {
    active,
  }
}
