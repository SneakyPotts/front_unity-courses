import type { ReactNode } from 'react'

import { THuman, TTeacher } from '@assets/types/globals'
import { TBasketCourse } from '@http/profile/type'

export type TCatalog = {
  count: number
  next: string | null
  previous: string | null
  results: TCourse[]
}

export type TCourse = TBasketCourse & {
  format: string
  color: string
  categories_repr: string[]
  rating: number
  number_of_lectures: number
  lectors: TTeacher[]
  start_date: string
  number_of_students: number
  max_number_of_students: number
  purchased: boolean
}

export type TFiltersResponse = {
  categories: TFilterItemResponse[]
  target_audiences: TFilterItemResponse[]
}

type TFilterItemResponse = {
  id: string
  title: string
}

export type TFilters = TFilterBlock[]

export type TFilterBlock = {
  title: string
  name: string
  filters: TFilterItem[]
  extraClass?: string
}

export type TFilterItem = {
  id: string
  title: string | ReactNode
  value: string | boolean
}

export type TCourseDetail = TBasketCourse & {
  format: 'live' | 'self' | 'mix'
  color: string
  categories_repr: string[]
  number_of_lectures: number
  rating: number
  lectors: TTeacher[]
  start_date: string
  number_of_students: number
  max_number_of_students: number
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
