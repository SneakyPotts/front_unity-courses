import { THuman } from '@assets/types/globals'

export type TCatalog = {
  count: number
  next: string | null
  previous: string | null
  results: TCourse[]
}

export type TCourse = {
  id: string
  title: string
  format: string
  color: string
  cover: string
  categories_repr: string[]
  rating: number
  number_of_lectures: number
  lectors: Array<THuman & { id: string }>
  start_date: string
  number_of_students: number
  max_number_of_students: number
  price: number
  discount: number
}
