import classNames from 'classnames'
import React, { type PropsWithChildren } from 'react'

import type { FieldWrapperProps } from './FieldWrapper.props'

export function FieldWrapper({ label, name, className, children }: PropsWithChildren<FieldWrapperProps>) {
  return (
    <div className={classNames('field', className)}>
      {label && (
        <label
          className="field__label"
          htmlFor={`form[${name}]`}
        >
          {label}
        </label>
      )}
      {children}
    </div>
  )
}
