import type { TBasketCourse } from '@http/profile/type'

export interface BasketModalProps {
  onClose: () => void
  showChildBoughtModal: () => void
}

export interface AuthInfoProps {
  basket?: TBasketCourse[]
  role: {
    teacher: boolean
    student: boolean
    parent: boolean
  }
  showChildBoughtModal: () => void
}
