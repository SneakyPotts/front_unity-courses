import type { TReviewItem } from '@http/courses/type'

export interface ReviewItemProps extends TReviewItem {
  courseId: string
}
