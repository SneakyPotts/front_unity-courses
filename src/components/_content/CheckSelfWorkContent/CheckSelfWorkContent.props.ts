import type { File } from '@assets/types/globals'
import type { TSelfProgress } from '@http/teacher/types'

export interface CheckSelfWorkContentProps {
  data: TSelfProgress
}

export interface TeacherHomeWorkListProps {
  data: File[]
}

export interface TeacherHomeWorkSliderProps {
  data: File[]
  activeSlide: number
  onClose: () => void
}
