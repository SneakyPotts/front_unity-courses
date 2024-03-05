import type { TTeacherCourseStats } from '@http/teacher/types'

export interface TeacherStatisticsContentProps {
  data?: TTeacherCourseStats[]
  courseId?: string
}
