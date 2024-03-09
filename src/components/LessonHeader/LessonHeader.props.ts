export interface LessonHeaderProps {
  data?: {
    title: string
    topic_title: string
    course_title: string
    course_color: string
    course_icon?: string
    start_time?: string
  }
  isCheckWork?: boolean
}
