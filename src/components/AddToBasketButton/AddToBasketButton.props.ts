import type { TBasketCourse } from '@http/profile/type'

export interface AddToBasketButtonProps {
  course: Omit<TBasketCourse, 'users'>
  callback: () => void
}
