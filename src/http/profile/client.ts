import { clientAuthFetch } from '@http/clientApi'
import { revalidateProfile } from '@http/profile/actions'
import { useMutation } from '@tanstack/react-query'

const setAvatar = ({ user_id, body }: { user_id: string; body: FormData }) =>
  clientAuthFetch<any>(`/users/${user_id}/avatar/`, {
    method: 'POST',
    body,
    isFile: true,
  })

const updateParentProfile = ({ id, ...body }: { id: string } & Record<string, string>) =>
  clientAuthFetch<any>(`/users/parent/profile/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  })

const updateTeacherProfile = ({ id, ...body }: { id: string } & Record<string, string>) =>
  clientAuthFetch<any>(`/users/teacher/profile/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  })

const updateExternalProfile = ({ id, ...body }: { id: string } & Record<string, string>) =>
  clientAuthFetch<any>(`/users/update_external_student_profile/`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  })

const updatePassword = (body: { old_password: string; new_password: string }) =>
  clientAuthFetch<any>(`/users/change_password/`, {
    method: 'POST',
    body: JSON.stringify(body),
  })

export function useQueryProfile() {
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

  const { mutateAsync: setExternalProfile } = useMutation({
    mutationFn: updateExternalProfile,
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
    setExternalProfile,
    changePassword,
  }
}
