const statusNames = {
  waiting: 'Очікує на перевірку',
  checked: 'Перевірено',
  completed: 'Завершено',
} as const

export type WorkStatus = keyof typeof statusNames

export type WorkType = 'Контрольна робота' | 'Самостійна робота' | 'Домашня робота'

export interface TestKnowledgeItemProps {
  id: string
  className?: string
  minimal?: boolean
  subjectName: string
  subjectTheme?: string
  classroom: string
  status: WorkStatus
  type: WorkType
  tasksCount: number
  tasksCheckedCount: number
}
