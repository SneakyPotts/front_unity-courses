import { Subject } from '@assets/types/globals'

export interface StatisticDropdownProps {
  name: string
  list?: Subject[]
  placeholder?: string
  onChange?: (id: string) => void
}

export type TAllSubjects = {
  id: string
  title: string
}
