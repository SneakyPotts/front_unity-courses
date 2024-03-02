import type { PropsWithChildren } from 'react'

export type ServerResponse<T> = {
  status: string | number
  data: T
}

export type ErrorResponse = {
  extra: {
    fields: {
      [key: string]: string[]
    }
  }
  message:
    | string
    | {
        detail: 'Наданий токен не відповідає жодному типу ключа'
        code: 'token_not_valid'
        messages: Array<Record<string, string>>
      }
}

/** Partial for same fields */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/** Page props type */
export type TPageProps = { params: { [key: string]: string | string[] }; searchParams: { [key: string]: string } }

/** Layout props type */
export type TLayoutProps = PropsWithChildren<{ params: { [key: string]: string } }>

export type ChildRoute = {
  title: string
  path: string
  element: JSX.Element
}

export type Route = {
  title: string
  rootPath: string
  list: ChildRoute[]
}

export type Tokens = {
  access: string
  refresh: string
}

export type TDocument = {
  id: string
  type: number
  file: string
  name: string
  created_at: string
}

export type THuman = {
  last_name: string
  first_name: string
  patronymic: string
  avatar: string
}

export interface StudentSubjects {
  id: string
  year: number
  pattern: string
  subjects: Subject[]
}

export interface Subject {
  id?: string
  title: string
  description: string
  color: string
  icon: string
  cover: string
  teacher?: TTeacher
  second_teacher?: TTeacher
  estimate_assessment?: string
  visiting?: string
  classroom?: TClass
  student_avatars?: string[]
}

export type TTeacher = THuman & {
  id: string
  qualification?: string
}

// export interface SubjectDetails {
//   topics: Topic[]
//   quarter_tests: QuarterTest[]
//   extra_tasks: ExtraTask[]
//   materials: Material[]
//   extra_materials: ExtraMaterial[]
//   links: Link[]
//   attendance: Statisticks
//   forecast_estimate: Statisticks
//   lesson_average_estimate: Statisticks
//   homework_average_estimate: Statisticks
//   test_average_estimate: Statisticks
//   self_test_average_estimate: Statisticks
//   other_test_average_estimate: Statisticks
//   description: string
//   title: string
//   teacher: TTeacher
//   second_teacher: TTeacher
//   color: string
//   cover: string
//   icon: string
//   classroom?: TClass
//   estimate_assessment?: string
//   visiting?: string
//   student_avatars?: string[]
// }

// export interface Topic {
//   order_num: number
//   id: string
//   title: string
//   quarter: number
// }

export interface QuarterTest {
  id: string
  created_at: string
  title: string
  content: string
  external_link: string
  quarter: number
  progress_type: number
  start_time: string
  end_time: string
  deadline: string
  subject: string
}

export interface ExtraTask {
  id: string
  created_at: string
  title: string
  content: string
  external_link: string
  position: number
  progress_type: number
  start_time: string
  end_time: string
  deadline: string
  quarter: number
  subject: string
}

export interface Material {
  id: string
  created_at: string
  name: string
  file: string
  subject: string
}

export interface ExtraMaterial {
  id: string
  created_at: string
  name: string
  file: string
  subject: string
}

export interface Link {
  id: string
  created_at: string
  title: string
  link: string
  subject: string
}

export interface Statisticks {
  value: number
  max_value: number
  percentage: number
}

export interface SubjectStatistic {
  id: string
  title: string
  marks: [
    {
      mark_type: number
      mark: number
      mark_id: string
    },
  ]
  average_mark: number
}

export interface SubjectStatisticOther {
  attendance: {
    value: number
    max_value: number
    percentage: number
  }
  forecast_estimate: {
    value: number
    max_value: number
    percentage: number
  }
  lesson_average_estimate: {
    value: number
    max_value: number
    percentage: number
  }
  homework_average_estimate: {
    value: number
    max_value: number
    percentage: number
  }
  test_average_estimate: {
    value: number
    max_value: number
    percentage: number
  }
  self_test_average_estimate: {
    value: number
    max_value: number
    percentage: number
  }
  other_test_average_estimate: {
    value: number
    max_value: number
    percentage: number
  }
}

export interface SubjectStatisticArrayItem {
  type: string
  value: number
  max_value: number
  percentage: number
}

export interface StudentSubjectTopic {
  position: number
  id: string
  title: string
  has_online_link: boolean
  has_homework: boolean
  has_test: boolean
  additional_works: number
  start_time: string
  end_time: string
}

export interface StudentLesson {
  id: string
  title: string
  topic_title: string
  icon: string
  color: string
  teacher: TTeacher
  content: string
  files: File[]
  links: Link[]
  homework: string
  test: string
  individual_work: string
  works: any[]
  is_visited: boolean
  subject_title: string
  next_lesson: string
  start_time: string
  online_lesson_link: string
  marks: Array<{
    id: string
    mark: number
    mark_type: number
  }>
  todo: {
    [key: string]: boolean
  }
}

export interface File {
  id: string
  name: string
  file: string
}

export interface Link {
  id: string
  title: string
  link: string
}

export interface StudentHomework {
  id: string
  title: any
  content: string
  progress_type: number
  files: any[]
  homework_progress: HomeworkProgress
  deadline: string
}

export interface HomeworkProgress {
  answer: string
  answer_timestamp: string
  block_timestamp: string
  student: string
  homework: string
  teacher: any
  teacher_reply: any
  teacher_reply_timestamp: any
  files: TDocument[]
}

export interface StudentIndividualWork {
  id: string
  title: string
  content: string
  progress_type: number
  external_link: string
  is_completed: boolean
  start_time: string
  end_time: string
  deadline: string
  mark: number
}

export interface StudentTest {
  id: string
  title: string
  content: string
  progress_type: number
  external_link: string
  is_completed: boolean
  start_time: string
  end_time: string
  deadline: string
  answer_timestamp: string
  mark: number
  quiz: IQuiz
}

export type IQuiz = {
  id: string
  questions: TQuestion[]
}

export type TQuestion = {
  id: string
  answer_type_str: string
  question: string
} & (
  | {
      answer_type: 1 | 2
      answers: TAnswerCheck[]
    }
  | {
      answer_type: 3 | 4
      answers: TAnswerCompliance
    }
  | {
      answer_type: 5
      answers: TAnswerFill[]
    }
  | {
      answer_type: 6
      answers: null
    }
)

export type TAnswerCheck = {
  id?: string
  text_answer?: string
  image_answer?: string
}

export type TAnswerCompliance = {
  left_column: TAnswerCheck[]
  right_column: TAnswerCheck[]
}

export type TAnswerFill = {
  id: string
  options?: string[]
}

export type TTestResult = Array<{
  question_id: string
  answers: string[]
}>

export interface StudentMarks extends THuman {
  id: string
  marks: Array<{
    mark_id: string
    mark_type: number
    mark: number
    instance_id: string
  }>
  forecast_mark: string
}

export type StudentMarkDetail = {
  mark: number
  mark_type: number
  mark_date: string
  title: string
  instance_id: string
  instance_title: string
  subject: {
    id: string
    title: string
    icon: string
    color: string
    teacher: {
      id: string
      last_name: string
      first_name: string
      patronymic: string
      avatar: string
    }
  }
}

export type TSchedule = {
  id: string
  title: string
  subject: string
  subject_icon: string
  start_time: string
  end_time: string
  online_lesson_link: string
  model_type: string
  subject_color: string
}

export type TClass = {
  id: string
  class_number: number
  name: string
  year: number
}
