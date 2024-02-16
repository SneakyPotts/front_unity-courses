import { TUrgentTask } from '@http/student/types'

export interface UrgentTasksProps {
  list: {
    data?: TUrgentTask[]
    isLoading: boolean
    isError: boolean
  }
  isStudent?: boolean
}

export interface UrgentTaskProps extends TUrgentTask {
  isStudent?: boolean
}
