import type { RatingChange } from '@smastrom/react-rating'

export interface RatingStarsProps {
  value: number
  onChange?: RatingChange
  readOnly?: boolean
  items?: number
}
