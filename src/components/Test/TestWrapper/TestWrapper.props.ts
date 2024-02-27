import type { PropsWithChildren } from 'react'

export interface TestWrapperProps extends PropsWithChildren {
  indexNumber: number
  question?: string
  description?: string
}
