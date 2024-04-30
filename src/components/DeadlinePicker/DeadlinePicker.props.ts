import type { ReactNode } from 'react'

export interface DeadlinePickerProps {
  deadline?: string
  handler?: (date: string) => Promise<any>
  onSave?: (date: Date) => void
  onClear?: () => void
  customInput?: ReactNode
  isShowTime?: boolean
}
