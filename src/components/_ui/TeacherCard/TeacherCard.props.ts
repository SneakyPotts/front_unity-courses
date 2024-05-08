import type { TTeacher } from '@assets/types/globals'

export interface TeacherCardProps {
  data: TTeacher & { role?: number }
  className?: string
  isStudent?: boolean
  isMain?: boolean
}
