import { clientAuthFetch } from '@http/clientApi'
import type { TNotificationsResponse } from '@http/common/types'
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'

const getNotifications = ({ page = 1, page_size = 5 }: { page?: number; page_size?: number }) =>
  clientAuthFetch<TNotificationsResponse>(`/courses/notifications/?page=${page}&page_size=${page_size}`)

const getHasUnread = () => clientAuthFetch<boolean>(`/courses/notifications/has_unread/`)

const patchReadAll = () =>
  clientAuthFetch<any>(`/courses/notifications/read_all/`, {
    method: 'PATCH',
  })

export function useNotifications({ page = 1, page_size = 5 }: { page?: number; page_size?: number }) {
  const notifications = useQuery({
    queryKey: ['notifications', page, page_size],
    queryFn: () => getNotifications({ page, page_size }),
    placeholderData: keepPreviousData,
  })

  const hasUnread = useQuery({
    queryKey: ['notificationsHasUnread'],
    queryFn: () => getHasUnread(),
  })

  const readAll = useMutation({
    mutationFn: () => patchReadAll(),
    onSuccess: () => {
      hasUnread.refetch().then().catch(console.error)
    },
  })

  return {
    notifications,
    hasUnread,
    readAll,
  }
}
