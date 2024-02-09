import type { HTMLProps } from 'react'

export interface HeaderProps extends HTMLProps<HTMLElement> {}
export interface ProfilePopupProps {
  onClose: () => void
}
