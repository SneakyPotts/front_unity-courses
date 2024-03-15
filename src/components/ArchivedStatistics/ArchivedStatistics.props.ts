import type { TArchivedCoursesStats } from '@http/student/types'

export interface ArchivedStatisticsProps {
  data?: TArchivedCoursesStats[]
  isLoading?: boolean
  isError?: boolean
}
