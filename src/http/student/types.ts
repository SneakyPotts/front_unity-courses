import type { THuman, TSchedule } from '@assets/types/globals'

export type TStudentSchedule = TSchedule & {
  teacher: {
    id: string
    last_name: string
    first_name: string
    patronymic: string
    avatar: string
  }
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
    teacher: {
      id: string
      last_name: string
      first_name: string
      patronymic: string
      avatar: string
      qualification: string
    }
  }>
}
