import { clientAuthFetch } from '@http/clientApi'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { TStudentCourses, TStudentProfileInfo } from './types'

const getStudentProfileInfo = (student_id?: string) => clientAuthFetch<TStudentProfileInfo>(`/detail/student/${student_id}`)

export function useQueryStudent(student_id?: string) {
  const queryClient = useQueryClient()

  const profile = useQuery({
    queryKey: [student_id],
    queryFn: () => getStudentProfileInfo(student_id),
    enabled: !!student_id,
  })

  // const { mutateAsync: create } = useMutation({
  //   mutationFn: createToDo,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['ToDoList'] }).then()
  //   },
  // })

  return {
    profile,
  }
}

const getStudentCoursesActive = ({ page = 1 }: { page?: number }) => clientAuthFetch<TStudentCourses>(`/courses/student/active/?page=${page}`)

const getStudentCoursesArchived = ({ page = 1 }: { page?: number }) => clientAuthFetch<TStudentCourses>(`/courses/student/archived/?page=${page}`)

export function useQueryStudentCourses({ tab_id, page }: { tab_id: string; page?: number }) {
  const queryClient = useQueryClient()

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
