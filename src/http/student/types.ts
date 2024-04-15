import type { File, IQuiz, TDocument, THuman, TSchedule, TTeacher } from '@assets/types/globals'
import type { TMark } from '@http/teacher/types'

export type TStudentSchedule = TSchedule & {
  teacher: TTeacher
  user_visited: boolean
  lesson_icons: {
    has_online_link: boolean
    has_homework: boolean
    has_test: boolean
    additional_works: boolean
    is_visited: boolean
  }
  avg_mark: number
}

export type TUrgentTask = {
  id: string
  title: string
  deadline: string
  lesson_id: string
  subject_id: string
}

export type TStudentProfileInfo = THuman & {
  date_of_birth: string
  gender: 'M' | 'F'
  city: string
  classroom: Array<{
    id: string
    name: string
    teacher: TTeacher
  }>
}

export type TStudentCourses = {
  count: number
  next: string
  previous: string
  results: TStudentActiveCourseItem[]
}

export type TStudentActiveCourseItem = {
  id: string
  title: string
  description: string
  format: 'self' | 'live' | 'mix'
  color: string
  cover: string
  categories_repr: string[]
  number_of_lectures: number
  lectures_hours: number
  rating: number
  lectors: TTeacher[]
  start_date: string
  duration_in_months: number
  closest_lecture: string
  available_days: number
  my_rating?: number
  certificate?: string
  certificate_done: boolean
}

export type TStatsTypes = 'visiting' | 'mark' | 'progress'

export type TStatsItem = {
  value: number
  max_value: number
  percentage: number
}

export type TCourseStats = Record<TStatsTypes, TStatsItem>

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
  teacher_reply: string
  teacher_reply_timestamp: string
  mark: number
}

export type TMarksCoursesStats = {
  id: string
  title: string
  color: string
  cover: string
  marks: TMark[]
  average_mark: number
  final_mark: number
}

export type TArchivedCoursesStats = {
  id: string
  title: string
  color: string
  cover: string
  final_mark: number
}

export type TCourseExam = {
  id: string
  course_id: string
  title: string
  course_icon: string
  course_title: string
  course_color: string
  content: string
  test_type: string
  lectors: TTeacher[]
  external_link: string
  quiz: IQuiz
  deadline: string
  progress_type: number
  progress: TExamProgress
}

export type TExamProgress = {
  id: string
  answer: string
  answer_timestamp: string
  files: File[]
  is_completed: boolean
  teacher_reply: string
  teacher_reply_timestamp: string
  status: number
  mark: number
}
