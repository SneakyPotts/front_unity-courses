import type { ReactNode } from 'react'

import { IQuiz, TDocument, THuman, TTeacher } from '@assets/types/globals'
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
  closest_lecture: string
  number_of_students: number
  max_number_of_students: number
  topics: Topic[]
  materials: TDocument[]
  links: ExtraLink[]
  duration_in_months: number
  available_days: number
  lectures_hours: number
  purchased: boolean
  reviews: TReviewPreview[]
}

export interface TReviewPreview {
  id: string
  created_at: string
  user: THuman & { id: string }
  rating: number
  content: string
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

export interface ExtraLink {
  id: string
  title: string
  link: string
}

export type TLessonContent = {
  id: string
  topic_id: string
  topic_title: string
  course_id: string
  course_title: string
  course_color: string
  course_icon: string
  title: string
  start_time: string
  is_free: boolean
  content: string
  online_lesson_link: string
  video_url: string
  test: string
  self_education_work: string
  is_visited: boolean
  lectors: TTeacher[]
}

export type TTestContent = {
  id: string
  topic_id: string
  topic_title: string
  course_id: string
  course_title: string
  course_color: string
  course_icon: string
  test_type: string
  external_link: string
  progress_type: number
  deadline: string
  quiz: IQuiz
  progress: Progress
}

export interface Progress {
  answer_timestamp: string
  is_completed: boolean
  teacher_reply: string
  teacher_reply_timestamp: string
  status: number
  mark: number
}

export type TSelfWorkContent = {
  id: string
  topic_id: string
  topic_title: string
  course_id: string
  course_title: string
  course_color: string
  course_icon: string
  title: string
  content: string
  progress_type: number
  deadline: string
  progress: SelfProgress
}

export interface SelfProgress {
  id: string
  student_answer: string
  status: number
  answer_timestamp: string
  block_timestamp: string
  files: TDocument[]
}

export type TCourseReview = {
  title: string
  description: string
  format: string
  color: string
  cover: string
  categories_repr: string[]
  lectors: TTeacher[]
  rating: number
  reviews: TReviews
  my_rating: number
}

export type TReviews = {
  count: number
  next: string
  previous: string
  results: TReviewItem[]
}

export interface TReviewItem {
  id: string
  created_at: string
  user: THuman & { id: string }
  rating: number
  content: string
  replies: TReviewReply[]
}

export type TReviewReply = {
  id: string
  user: THuman & { id: string }
  content: string
  created_at: string
}
