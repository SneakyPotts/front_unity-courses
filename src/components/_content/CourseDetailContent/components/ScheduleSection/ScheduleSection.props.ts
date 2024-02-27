import type { Topic } from '@http/courses/type'

export interface ScheduleSectionProps {
  courseId?: string
  courseFree?: boolean
  topics?: Topic[]
  titleClass?: string
  wrapperClass?: string
}
