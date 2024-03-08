import { TTeacher } from '@assets/types/globals'
import type { TStudentActiveCourseItem } from '@http/student/types'

export interface CourseCardProps extends TStudentActiveCourseItem {
  students?: TTeacher[]
  isArchived?: boolean
  isTeacher?: boolean
}
