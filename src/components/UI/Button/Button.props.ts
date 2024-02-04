import type { HTMLProps } from 'react'

export interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  /** Button type */
  type?: 'button' | 'submit'
  /** Button view variant */
  variant?: 'accent' | 'border' | 'gray'
  /** Fulfilling parents container width */
  fulFill?: boolean
  /** URL for change like <a href=""/>*/
  href?: string
  /** Attr <a target=""/> */
  target?: '_blank'
}
