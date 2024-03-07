import type { TLessonContent } from '@http/student/types'
import type { TTeacherContent } from '@http/teacher/types'

export interface LessonPageContentProps {
  data?: TLessonContent | TTeacherContent
  role: {
    teacher: boolean
    student: boolean
    parent: boolean
  }
}
