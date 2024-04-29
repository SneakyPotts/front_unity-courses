import { clientAuthFetch } from '@http/clientApi'
import type { IRemindAboutTaskDTO } from '@http/teacher/types'
import { useMutation } from '@tanstack/react-query'

const remindAboutTasks = ({ ...data }: IRemindAboutTaskDTO) =>
  clientAuthFetch<any>(`/courses/notifications/send_reminder_to_student/`, {
    method: 'POST',
    body: JSON.stringify(data),
  })

export function useTeacherNotifications() {
  const remind = useMutation({
    mutationFn: remindAboutTasks,
  })

  return {
    remind,
  }
}
