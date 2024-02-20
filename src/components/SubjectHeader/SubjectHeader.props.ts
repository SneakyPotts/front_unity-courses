export interface SubjectHeaderProps {
  title?: string
  color?: string
  categories_repr?: string[]
  cover?: string
  start_date?: string
  format?: 'live' | 'self' | 'mix'
  number_of_lectures?: number
  rating?: number
  max_number_of_students?: number
  number_of_students?: number
  price?: number
  discount?: number
}
