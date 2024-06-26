import { File, Link, THuman, TSchedule, TTeacher } from '@assets/types/globals'
import { TLessonContent } from '@http/student/types'

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

export type TSimpleCourse = {
  id: string
  title: string
}

export interface TTeacherCourseStats {
  id: string
  last_name: string
  first_name: string
  patronymic: string
  role: number
  avatar: string
  marks: TMark[]
  average_mark: number
  final_mark: number
}

export type TMark = {
  mark: number
  created_at: string
  type: string
}

export type TTeacherContent = Omit<TLessonContent, 'is_visited'>

export type TTeacherSelfWork = {
  id: string
  topic_id: string
  topic_title: string
  course_id: string
  course_title: string
  course_color: string
  course_icon: string
  content: string
  progress_type: number
  deadline: string
  progress: TStudentsProgress[]
}

export interface TStudentsProgress {
  id: string
  first_name: string
  last_name: string
  patronymic: string
  avatar: string
  work_progress: {
    id: string
    status: number
  }
  mark: number
}

export type TTeacherTestWork = {
  id: string
  topic_id: string
  topic_title: string
  course_id: string
  course_title: string
  course_color: string
  course_icon: string
  test_type: string
  external_link: string
  quiz: string
  progress_type: number
  deadline: string
  progress: TStudentTestProgress[]
}

export type TStudentTestProgress = {
  id: string
  first_name: string
  last_name: string
  patronymic: string
  avatar: string
  test_progress: {
    id: string
    answer_timestamp: string
    is_completed: boolean
    teacher_reply: string
    teacher_reply_timestamp: string
    status: number
    mark: number
  }
  mark: number
}

export type TSelfProgress = {
  id: string
  lecture_id: string
  work_id: string
  title: string
  topic_id: string
  topic_title: string
  course_id: string
  course_title: string
  course_color: string
  course_icon: string
  student_answer: string
  answer_timestamp: string
  block_timestamp: string
  teacher_reply: string
  teacher_reply_timestamp: string
  status: number
  mark: number
  deadline: string
  student: TTeacher & { role: number }
  progress_type: number
  files: File[]
}

export type TTestProgress = {
  id: string
  test_id: string
  lecture_id: string
  title: string
  topic_id: string
  topic_title: string
  course_id: string
  course_title: string
  course_color: string
  course_icon: string
  test_type: string
  progress_type: number
  external_link: string
  quiz: {
    id: string
    all_tasks_number: number
    checked_by_service: number
    students_correct_answers: number
    estimate_mark: number
    result: TResult[]
  }
  answer_timestamp: string
  is_completed: boolean
  teacher_reply: string
  teacher_reply_timestamp: string
  mark: number
  status: number
  deadline: string
  student: TTeacher & { role: number }
}

export type TExamTotal = {
  id: string
  course_id: string
  course_title: string
  course_color: string
  course_icon: string
  title: string
  lectors: TTeacher[]
  content: string
  test_type: string
  external_link: string
  quiz: string
  deadline: string
  progress_type: number
  progress: TExamTotalProgress[]
}

export interface TExamTotalProgress {
  id: string
  first_name: string
  last_name: string
  patronymic: string
  avatar: string
  test_progress: TExamTotalTestProgress
  mark: number
}

export interface TExamTotalTestProgress {
  id: string
  answer: string
  answer_timestamp: string
  files: Array<{
    id: string
    name: string
    file: string
  }>
  is_completed: boolean
  teacher_reply: string
  teacher_reply_timestamp: string
  status: number
  mark: number
}

export interface IExamPatch {
  exam_id: string
  content?: string
  test_type?: 'INT' | 'EXT' | 'TXT'
  external_link?: string
  deadline?: string
  progress_type?: number
}

export type TTeacherExamProgress = {
  id: string
  test_id: string
  course_id: string
  course_title: string
  course_color: string
  course_icon: string
  test_type: string
  progress_type: string
  external_link: string
  quiz: {
    id: string
    all_tasks_number: number
    checked_by_service: number
    students_correct_answers: number
    estimate_mark: number
    result: TResult[]
  }
  answer_timestamp: string
  is_completed: boolean
  teacher_reply: string
  teacher_reply_timestamp: string
  mark: number
  status: number
  deadline: string
  student: THuman & {
    id: string
    test_progress: ExamProgress
    mark: number
    role: number
  }
}

export interface ExamProgress {
  id: string
  answer: string
  answer_timestamp: string
  files: Array<{
    id: string
    name: string
    file: string
  }>
  is_completed: boolean
  teacher_reply: string
  teacher_reply_timestamp: string
  status: number
  mark: number
}

/*notifications*/
export interface IRemindAboutTaskDTO {
  student_id: string
  work_type: TWorkType
  object_id: string
}

export type TWorkType = 'self_work' | 'final_test' | 'test'
/*notifications*/
