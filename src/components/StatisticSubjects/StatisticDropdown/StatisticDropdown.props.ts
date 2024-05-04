export interface StatisticDropdownProps {
  name: string
  list?: Array<{
    id: string
    title: string
  }>

  placeholder?: string
  onChange?: (id: string) => void
}

export type TAllSubjects = {
  id: string
  title: string
}
