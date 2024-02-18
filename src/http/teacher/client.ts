import { clientAuthFetch } from '@http/clientApi'
import type { TTeacherProfileInfo } from '@http/teacher/types'
import { useQuery, useQueryClient } from '@tanstack/react-query'

const getTeacherProfileInfo = (teacher_id?: string) => clientAuthFetch<TTeacherProfileInfo>(`/detail/teacher/${teacher_id}`)

export function useQueryTeacher(teacher_id?: string) {
  const queryClient = useQueryClient()

  const profile = useQuery({
    queryKey: [teacher_id],
    queryFn: () => getTeacherProfileInfo(teacher_id),
    enabled: !!teacher_id,
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
