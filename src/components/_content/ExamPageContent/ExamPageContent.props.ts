import type { TCourseExam } from '@http/student/types'
import type { TExamTotal } from '@http/teacher/types'

export interface ExamPageContentProps {
  exam: TCourseExam | TExamTotal
  role: {
    teacher: boolean
    student: boolean
    parent: boolean
  }
}
