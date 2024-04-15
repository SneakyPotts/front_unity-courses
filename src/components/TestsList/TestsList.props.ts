import type { UseFormSetValue } from 'react-hook-form'

import type { IQuiz, TAnswerCheck, TAnswerFill, TQuestion, TTestResult } from '@assets/types/globals'
import type { UseMutateAsyncFunction } from '@tanstack/react-query'

export interface TestsListProps extends IQuiz {
  test_id: string
  setNotEditing: () => void
  extraHandler?: UseMutateAsyncFunction<any, Error, { test_id: string; body: TTestResult }, unknown>
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
