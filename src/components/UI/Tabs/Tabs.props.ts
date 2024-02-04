export interface TabsProps {
  list: string[]
  activeTab: number
  setActiveTab: React.Dispatch<React.SetStateAction<number>>
  className?: string
  isStatic?: boolean
  isSmall?: boolean
  isBig?: boolean
  element?: React.ReactNode
}
