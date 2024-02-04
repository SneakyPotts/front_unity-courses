import type { HTMLProps } from 'react'

export interface CheckboxProps extends HTMLProps<HTMLInputElement> {
  label?: string
  classWrapper?: string
}
