import { Topic } from '@http/courses/type'

export interface LessonsNavigationProps {
  courseId: string
  onClose: () => void
}

export interface LessonsNavigationAccordionProps extends Topic {
  orderNum: number
  onClose: () => void
}
