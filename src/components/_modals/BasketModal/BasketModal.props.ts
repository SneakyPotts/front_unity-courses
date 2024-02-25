export interface BasketModalProps {
  showChildBoughtModal: () => void
  onClose: () => void
}

export interface AuthInfoProps {
  role: {
    teacher: boolean
    student: boolean
    parent: boolean
  }
  showChildBoughtModal: () => void
  onClose: () => void
}
