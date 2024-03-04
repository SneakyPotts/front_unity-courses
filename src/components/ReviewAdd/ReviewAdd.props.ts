import type { TReviewItem } from '@http/courses/type'

export interface ReviewAddProps {
  courseId?: string
  handleAdd?: (review: TReviewItem) => void
}
