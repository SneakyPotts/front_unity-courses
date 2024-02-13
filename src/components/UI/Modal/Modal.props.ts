export interface ModalProps {
  variant:
    | 'login'
    | 'resetPass'
    | 'checkEmail'
    | 'newPass'
    | 'upload'
    | 'deposit'
    | 'thanks'
    | 'error'
    | 'changePhoto'
    | 'rotate'
    | 'teacherCard'
    | 'studentCard'
    | 'courseInvite'
    | 'empty'
    | 'basket-model'
  title: string
  tip?: string
  onClose?: () => void
  onBack?: () => void
}
