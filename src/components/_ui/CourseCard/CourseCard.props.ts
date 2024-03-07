import type { TStudentActiveCourseItem } from '@http/student/types'

export interface CourseCardProps extends TStudentActiveCourseItem {
  isArchived?: boolean
  isTeacher?: boolean
}
