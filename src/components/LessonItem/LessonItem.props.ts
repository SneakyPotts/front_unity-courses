export interface LessonItemProps {
  id: string
  title: string
  subject: string
  subject_icon: string
  start_time: string
  end_time: string
  model_type: string
  teacher: {
    id: string
    first_name: string
    last_name: string
    patronymic: string
    avatar: string
  }
  user_visited: boolean
  lesson_icons: Array<{}> | null
}

export type TeacherProps = {
  onClick: () => void
  img?: string
  name: string
}
