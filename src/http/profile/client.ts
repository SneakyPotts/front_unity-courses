import { clientAuthFetch } from '@http/clientApi'
import { revalidateProfile } from '@http/profile/actions'
import type { TProfile } from '@http/profile/type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const setAvatar = ({ user_id, body }: { user_id: string; body: FormData }) =>
  clientAuthFetch<any>(`/users/${user_id}/avatar/`, {
    method: 'POST',
    body,
    isFile: true,
  })

const updateParentProfile = ({ id, ...body }: TProfile & { id: string }) =>
  clientAuthFetch<any>(`/users/parent/profile/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  })

const updateTeacherProfile = ({ id, ...body }: TProfile & { id: string; qualification: string }) =>
  clientAuthFetch<any>(`/users/teacher/profile/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  })

const updatePassword = (body: { old_password: string; new_password: string }) =>
  clientAuthFetch<any>(`/users/change_password/`, {
    method: 'POST',
    body: JSON.stringify(body),
  })

export function useQueryProfile() {
  const queryClient = useQueryClient()

  // const get = useQuery({
  //   queryKey: ['ToDoList'],
  //   queryFn: getToDoList,
  // })

  const { mutateAsync: avatar } = useMutation({
    mutationFn: setAvatar,
    onSuccess: () => {
      revalidateProfile()
    },
  })

  const { mutateAsync: setParentProfile } = useMutation({
    mutationFn: updateParentProfile,
    onSuccess: () => {
      revalidateProfile()
    },
  })

  const { mutateAsync: setTeacherProfile } = useMutation({
    mutationFn: updateTeacherProfile,
    onSuccess: () => {
      revalidateProfile()
    },
  })

  const changePassword = useMutation({
    mutationFn: updatePassword,
  })

  return {
    // get,
    avatar,
    setParentProfile,
    setTeacherProfile,
    changePassword,
  }
}
