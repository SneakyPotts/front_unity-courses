import type { THuman } from '@assets/types/globals'

type TTeacher = THuman & { id: string }

export interface TeachersSectionProps {
  lectors?: TTeacher[]
}

export interface TeacherBoxProps extends TTeacher {}
