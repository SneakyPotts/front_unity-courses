export interface AuthModalProps {
  showRegister: () => void
  onClose: () => void
}

export interface AuthFormProps extends Partial<AuthModalProps> {
  isBasket?: boolean
}
