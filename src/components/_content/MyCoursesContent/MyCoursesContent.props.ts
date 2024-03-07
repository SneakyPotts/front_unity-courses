import type { TStudentCourses } from '@http/student/types'

export interface MyCoursesContentProps {}

export interface TabContentProps {
  data?: TStudentCourses
  isLoading: boolean
  isError: boolean
  isArchived?: boolean
}
