import classNames from 'classnames'
import React, { forwardRef } from 'react'

import { FieldWrapper } from '_ui/FieldWrapper'

import type { FieldProps } from './Field.props'

export const Field = forwardRef<HTMLInputElement, FieldProps>(function Field(props, ref) {
  const { className, label, type, tip, error, extraChild, ...otherProps } = props

  return (
    <FieldWrapper
      className={className}
      label={label}
      name={props.name}
    >
      <div className="field__wrapper">
        <input
          ref={ref}
          type={type}
          id={`form[${props.name}]`}
          className={classNames('field__input input', { 'input--error': error })}
          {...otherProps}
          data-input={''}
        />
        {error && (
          <svg className="field__icon">
            <use href="/img/sprite.svg#warn"></use>
          </svg>
        )}
      </div>
      {error && <span className="field__error">{error}</span>}
      {tip && <span className="field__tip">{tip}</span>}
      {extraChild}
    </FieldWrapper>
  )
})
