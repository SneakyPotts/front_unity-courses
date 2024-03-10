import type { TResult, TTestProgress } from '@http/teacher/types'

export interface CheckTestWorkContentProps {
  data: TTestProgress
}

type TAnswerProps = TResult & {
  indexNumber: number
}

export type StrictComplianceAnswerProps = TAnswerProps & {
  answer_type: 3
}

export type NotStrictComplianceAnswerProps = TAnswerProps & {
  answer_type: 4
}

export type TextAnswerProps = TAnswerProps & {
  text: string[]
}
