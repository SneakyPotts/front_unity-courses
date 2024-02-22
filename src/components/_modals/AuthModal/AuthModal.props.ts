export interface AuthModalProps {
  showRegister: () => void
  showRegisterBasket: () => void
  onClose: () => void
}

export interface AuthFormProps extends Partial<AuthModalProps> {
  isBasket?: boolean
}
