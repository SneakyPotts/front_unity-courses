export interface ScheduleDayProps {
  title?: string
  schedule: {
    data?: any
    isLoading: boolean
    isError: boolean
  }
  isTeacher: boolean
  isStudent: boolean
}
