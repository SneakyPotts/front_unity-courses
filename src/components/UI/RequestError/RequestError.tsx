import React from 'react'

import type { RequestErrorProps } from './RequestError.props'

export function RequestError({ data }: RequestErrorProps) {
  return (
    <div className={'text-center'}>
      <span className="field__error">{data.extra?.fields?.[0] || data.message}</span>
    </div>
  )
}
