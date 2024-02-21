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

export type TFiltersResponse = {
  categories: TFilterItemResponse[]
  target_audiences: TFilterItemResponse[]
}

type TFilterItemResponse = {
  id: string
  title: string
}

export type TFilters = TFilterItem[]

export type TFilterItem = {
  title: string
  name: string
  filters: Array<{
    id: string
    title: string
    value: string | boolean
  }>
  extraClass?: string
}

export type TCourseDetail = {
  id: string
  title: string
  format: 'live' | 'self' | 'mix'
  color: string
  cover: string
  categories_repr: string[]
  number_of_lectures: number
  rating: number
  lectors: Array<THuman & { id: string }>
  start_date: string
  number_of_students: number
  max_number_of_students: number
  price: number
  discount: number
  topics: Topic[]
  materials: ExtraMaterial[]
  links: ExtraMaterial[]
}

export interface Topic {
  id: string
  title: string
  lectures: TLecture[]
}

export type TLecture = {
  id: string
  title: string
  start_time: string
  is_free: boolean
  online_lesson_link: string
  video_url: string
  has_test: boolean
  has_self_education_work: boolean
}

export interface ExtraMaterial {
  id: string
  name: string
  file: string
}
