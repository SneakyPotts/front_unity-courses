import type { Dispatch, ReactNode, SetStateAction } from 'react'

export interface TabsProps {
  list: string[]
  activeTab: number
  setActiveTab: Dispatch<SetStateAction<number>>
  className?: string
  isStatic?: boolean
  isSmall?: boolean
  isBig?: boolean
  element?: ReactNode
}
