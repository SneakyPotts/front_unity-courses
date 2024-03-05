import { TStudentActiveCourseItem } from '@http/student/types'

export interface StatisticDropdownProps {
  name: string
  list?: TStudentActiveCourseItem[]
  placeholder?: string
  onChange?: (id: string) => void
}

export type TAllSubjects = {
  id: string
  title: string
}
