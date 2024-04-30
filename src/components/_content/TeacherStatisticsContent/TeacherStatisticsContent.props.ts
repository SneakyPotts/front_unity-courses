import type { TMarksCoursesStats } from '@http/student/types'
import type { TTeacherCourseStats } from '@http/teacher/types'

export interface TeacherStatisticsContentProps {
  data?: (TTeacherCourseStats | TMarksCoursesStats)[]
  isLoading?: boolean
  isError?: boolean
  courseId?: string
  isStudent?: boolean
}
