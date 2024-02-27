import type { HTMLProps } from 'react'

import { TAnswerCheck } from '@assets/types/globals'
import type { TOption } from '@store/teacher/types'

export type SingleProps = {
  id: string
  type: 'radio' | 'checkbox'
  description: string
  question: string
  indexNumber: number
  handleChange?: (id: string) => void
} & (
  | {
      variant: 'answer'
      options: TOption[]
    }
  | {
      variant: 'question'
      options: TAnswerCheck[]
    }
)

export type ListItemProps = HTMLProps<HTMLInputElement> & {
  item: TOption | TAnswerCheck
  type: 'radio' | 'checkbox'
  icon?: boolean
}
