import type { TSimpleCourse } from '@http/teacher/types'

export interface HeaderCoursesListProps {
  courses?: TSimpleCourse[]
  current: TSimpleCourse
  handler: (data: TSimpleCourse) => void
}
