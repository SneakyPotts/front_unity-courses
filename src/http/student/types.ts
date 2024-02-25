import { THuman, TSchedule, TTeacher } from '@assets/types/globals'

export type TStudentSchedule = TSchedule & {
  teacher: TTeacher
  user_visited: boolean
  lesson_icons: {
    has_online_link: boolean
    has_homework: boolean
    has_test: boolean
    additional_works: boolean
    is_visited: boolean
  }
  avg_mark: number
}

export type TUrgentTask = {
  id: string
  title: string
  deadline: string
  lesson_id: string
  subject_id: string
}

export type TStudentProfileInfo = THuman & {
  date_of_birth: string
  gender: 'M' | 'F'
  city: string
  classroom: Array<{
    id: string
    name: string
    teacher: TTeacher
  }>
}

export type TStudentCourses = {
  count: number
  next: string
  previous: string
  results: TStudentActiveCourseItem[]
}

export type TStudentActiveCourseItem = {
  id: string
  title: string
  description: string
  format: 'self' | 'live' | 'mix'
  color: string
  cover: string
  categories_repr: string[]
  number_of_lectures: number
  lectures_hours: number
  rating: number
  lectors: TTeacher[]
  start_date: string
  duration_in_months: number
  closest_lecture: string
  available_days: number
}
