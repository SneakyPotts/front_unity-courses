import type { HTMLProps } from 'react'

export interface AsideProps extends HTMLProps<HTMLElement> {
  variant?: 'static' | 'main'
}
