export interface TNotificationsResponse {
  count: number
  next: string
  previous: string
  results: TNotifications[]
}

export interface TNotifications {
  id: string
  content: string
  is_read: boolean
  created_at: string
}
