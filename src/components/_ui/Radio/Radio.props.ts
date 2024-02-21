import type { HTMLProps, ReactNode } from 'react'

export interface RadioProps extends Omit<HTMLProps<HTMLInputElement>, 'label'> {
  label?: string | ReactNode
  border?: boolean
  classWrapper?: string
}
