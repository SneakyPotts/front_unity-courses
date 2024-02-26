import type { File, Link, THuman, TSchedule, TTeacher } from '@assets/types/globals'

export type TTeacherLesson = {
  id: string
  subject_title: string
  topic_title: string
  lesson_title: string
  color: string
  icon: string
  online_lesson_link: string
  teacher: TTeacher
  second_teacher: TTeacher
  students_list: (TStudent & StudentOnlineLesson)[]
  content: string
  start_time: string
  end_time: string
  video_url?: string
  files: File[]
  links: Link[]
  homework: string
  test: string
  work: string
  moderation_status: 1 | 2 | 3 | null
}

export type TStudent = THuman & {
  id: string
}

export interface StudentOnlineLesson {
  is_visited: boolean
  marks: Array<{
    id: string
    mark: number
    mark_type: number
  }>
}

export type TTeacherTopic = {
  id: string
  title: string
  order_num: number
  quarter: number
  extra_tasks: any[]
  lessons: TLesson[]
}

export type TLesson = {
  id: string
  title: string
  start_time: Date
  end_time: Date
  additional_works: boolean
  has_homework: boolean
  has_online_link: boolean
  has_test: boolean
}

export type THomeWork = {
  id: string
  title: string
  lesson_title: string
  topic_title: string
  color: string
  icon: string
  content: string
  progress_type: number
  deadline: string
  students: THomeWorkStudent[]
}

export type THomeWorkStudent = TStudent & {
  progress: {
    progress_id: string
    status: string
    mark: number
  }
}

export type THomeWorkProgress = {
  id: string
  lesson_title: string
  topic_title: string
  color: string
  icon: string
  answer: string
  answer_timestamp: Date
  teacher_reply: string
  teacher_reply_timestamp: Date
  mark: number
  student: TStudent
  homework: string
  progress_type: number
  files: File[]
}

export type TIndividualWork = {
  id: string
  external_link: string
  deadline: string
  test_type: 'INT' | 'EXT'
  students: TIndividualWorkStudent[]
  lesson_title: string
  topic_title: string
  color: string
  icon: string
}

export type TIndividualWorkStudent = TStudent & {
  mark: number
  status: 1 | 2 | 3 | null
}

export type TTeacherSchedule = TSchedule & {
  lesson_visiting: {
    students_visited: number
    students_total: number
    percentage: number
  }
}

export type TTeacherClass = {
  name: string
  students: TStudentClass[]
}

export type TStudentClass = {
  id: string
  last_name: string
  first_name: string
  patronymic: string
  avatar: string
  average_mark: {
    value: number | null
    max_value: number
    percentage: number | null
  }
  visits: {
    value: number | null
    max_value: number
    percentage: number | null
  }
  attention: {
    title: string
    color: number
  }[]
}

export type TTeacherProfileInfo = THuman & {
  date_of_birth: string
  gender: 'M' | 'F'
  city: string
  qualification: string
  classroom: string[]
}

export type TTestAnswers = {
  student: TStudent
  lesson: {
    id: string
    deadline: string
    lesson_title: string
    topic_title: string
    color: string
    icon: string
  }
  answers: {
    id: string
    all_tasks_number: number
    checked_by_service: number
    students_correct_answers: number
    estimate_mark: number
    result: TResult[]
  }
  mark: number | null
  progress_type: number | null
}

export type TResult = {
  question_id: string
  question: string
  is_correct: boolean | null
} & (
  | {
      answer_type: 1 | 2
      options: TOption[]
    }
  | {
      answer_type: 3
      pairs: TPair[]
      student_pairs: string
    }
  | {
      answer_type: 4
      left_column: Array<
        TComplianceColumn & {
          compliance_answers: Array<{ id: string }>
          student_answer: string[]
          student_selected_correct: boolean
        }
      >
      right_column: TComplianceColumn[]
    }
  | {
      answer_type: 5
      correct_sentence: string
      student_sentence: string
    }
  | {
      answer_type: 6
      answer: string
    }
)

export type TOption = {
  text_answer?: string
  image_answer?: string
  is_correct: boolean
  student_checked_as_correct: boolean
}

export type TPair = {
  left_column: TComplianceColumn
  right_column: TComplianceColumn
  student_selected_correct: boolean
}
export type TComplianceColumn = {
  id: string
  text_answer: string
  image_answer: string
}
export type TRightColumn = {}
