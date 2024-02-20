import React from 'react'

import type { RequestErrorProps } from './RequestError.props'

export function RequestError({ message, extra }: RequestErrorProps) {
  return (
    <div className={'text-center error'}>
      <span className="field__error">{extra?.fields?.[0] || message}</span>
    </div>
  )
}
