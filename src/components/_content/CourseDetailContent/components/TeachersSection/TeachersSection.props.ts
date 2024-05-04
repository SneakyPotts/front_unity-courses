import { TTeacher } from '@assets/types/globals'

export interface TeachersSectionProps {
  lectors?: Lector[]
}

export interface TeacherBoxProps extends Lector {}

type Lector = TTeacher & {
  about_me: string
}
