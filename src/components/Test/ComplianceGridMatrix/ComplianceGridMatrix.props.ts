import { ChangeEventHandler } from 'react'

export interface ComplianceGridMatrixProps {
  rows: number
  cells: number
  answerCheckHandler?: (
    rowIndex: number,
    cellIndex: number,
  ) => {
    studentAnswer: boolean
    rightAnswer: boolean
  }
  valueGetter?: (rowIndex: number, cellIndex: number) => string
  checkedGetter?: (rowIndex: number, cellIndex: number) => boolean
  inputHandler?: ChangeEventHandler<HTMLInputElement>
}
