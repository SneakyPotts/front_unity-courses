import type { TBasketCourse } from '@http/profile/type'

export interface AddToBasketButtonProps {
  course: TBasketCourse
  callback: () => void
}
