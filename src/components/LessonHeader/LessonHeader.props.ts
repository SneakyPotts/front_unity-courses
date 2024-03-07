import type { TLessonContent } from '@http/student/types'
import type { TTeacherContent } from '@http/teacher/types'

export interface LessonHeaderProps {
  data?: TTeacherContent | TLessonContent
}
