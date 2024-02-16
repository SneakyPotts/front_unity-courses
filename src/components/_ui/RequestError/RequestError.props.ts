import type { ErrorResponse } from '@assets/types/globals'

export interface RequestErrorProps extends Omit<ErrorResponse, 'status'> {}
