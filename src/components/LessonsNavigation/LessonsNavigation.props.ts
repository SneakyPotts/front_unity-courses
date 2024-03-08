import type { TTopicLight } from '@http/courses/type'

export interface LessonsNavigationProps {
  courseId: string
  onClose: () => void
}

export interface LessonsNavigationAccordionProps extends TTopicLight {
  orderNum: number
  onClose: () => void
}
