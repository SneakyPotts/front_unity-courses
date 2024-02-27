import type { UseFormSetValue } from 'react-hook-form'

import type { IQuiz, TAnswerCheck, TAnswerFill, TQuestion } from '@assets/types/globals'

export interface TestsListProps extends IQuiz {
  test_id: string
  setNotEditing: () => void
}

type QuestionProps = TQuestion & {
  indexNumber: number
  setValue: UseFormSetValue<any>
}

export type SingleQuestionProps = QuestionProps & {
  answer_type: 1 | 2
}

export type ComplianceQuestionProps = QuestionProps & {
  answer_type: 3 | 4
}

export type FillQuestionProps = QuestionProps & {
  answer_type: 5
}

export type FreeQuestionProps = QuestionProps & {
  answer_type: 6
}

export interface FillInputProps {
  answer: TAnswerFill
  handleChange: (value: string) => void
}

export interface MatrixComplianceProps {
  cellsData: TAnswerCheck[]
  rowsData: TAnswerCheck[]
  type: 3 | 4
  handleChange: (args: any) => void
}
