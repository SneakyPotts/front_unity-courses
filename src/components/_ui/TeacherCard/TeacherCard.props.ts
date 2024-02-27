import type { TTeacher } from '@assets/types/globals'

export interface TeacherCardProps {
  data: TTeacher
  className?: string
  isStudent?: boolean
  isMain?: boolean
}
