import React from 'react'

import type { RequestErrorProps } from './RequestError.props'

export function RequestError({ extra, message }: RequestErrorProps) {
  const extraKey = extra && Object.keys(extra).find((key, i) => i === 0)

  return (
    <div className={'text-center error'}>
      <span className="field__error">{extraKey ? extra?.fields?.[extraKey] : typeof message === 'string' ? message : 'Щось пішло не так...'}</span>
    </div>
  )
}
