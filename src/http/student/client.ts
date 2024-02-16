import { clientAuthFetch } from '@http/clientApi'
import type { TStudentProfileInfo } from '@http/student/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

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
