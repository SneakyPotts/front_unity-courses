import type { HTMLProps, ReactNode } from 'react'

export interface CheckboxProps extends Omit<HTMLProps<HTMLInputElement>, 'label'> {
  label?: string | ReactNode
  classWrapper?: string
}
