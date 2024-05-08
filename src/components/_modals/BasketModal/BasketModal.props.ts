import type { TAboutMe, TBasketCourse } from '@http/profile/type'

export interface BasketModalProps {
  showRecoveryPass: () => void
  showRegisterBasket: () => void
  showChildBoughtModal: () => void
  onClose: () => void
}

export interface NotAuthInfoProps {
  showRecoveryPass: () => void
  showRegisterBasket: () => void
}

export interface AuthInfoProps {
  profile?: TAboutMe
  role: {
    teacher: boolean
    student: boolean
    parent: boolean
  }
  basket?: TBasketCourse[]
  showChildBoughtModal: () => void
  onClose: () => void
}
