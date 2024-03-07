import type { TStudentCourses } from '@http/student/types'

export interface MyCoursesContentProps {
  role: {
    teacher: boolean
    student: boolean
    parent: boolean
  }
}

export interface TabContentProps {
  data?: TStudentCourses
  isLoading: boolean
  isError: boolean
  isArchived?: boolean
}
