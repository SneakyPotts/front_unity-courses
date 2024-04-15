import type { PropsWithChildren } from 'react'

import type { TTeacher } from '@assets/types/globals'
import type { LessonHeaderProps } from '@components/LessonHeader/LessonHeader.props'

export interface LessonWrapperProps extends PropsWithChildren, LessonHeaderProps {
  aside?: LessonAsideProps
}

export interface LessonAsideProps {
  lectors?: TTeacher[]
  isTeacher?: boolean
  color?: string
  videoUrl?: string
}
