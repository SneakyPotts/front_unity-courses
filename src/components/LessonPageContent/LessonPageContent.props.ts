import type { TLessonContent, TSelfWorkContent } from '@http/courses/type'

export interface LessonPageContentProps {
  data?: TLessonContent
}

export interface TestWorkTabProps {
  testId: string
}

export interface IndividualWordProps {
  selfId: string
}

export interface LessonSelfWorkContentProps {
  selfWork?: TSelfWorkContent
  // marks?: {
  //   id: string
  //   mark: number
  //   mark_type: number
  // }[]
}
