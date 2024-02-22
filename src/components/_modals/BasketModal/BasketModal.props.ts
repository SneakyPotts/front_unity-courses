import type { TBasketCourse } from '@http/profile/type'

export interface BasketModalProps {
  showChildBoughtModal: () => void
  onClose: () => void
}

export interface AuthInfoProps {
  basket?: TBasketCourse[]
  role: {
    teacher: boolean
    student: boolean
    parent: boolean
  }
  showChildBoughtModal: () => void
  onClose: () => void
}
