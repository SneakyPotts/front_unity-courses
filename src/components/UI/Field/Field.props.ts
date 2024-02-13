import type { HTMLProps, ReactNode } from 'react'

export interface FieldProps extends HTMLProps<HTMLInputElement> {
  type: 'text' | 'password'
  tip?: string
  error?: any
  extraChild?: ReactNode
}
