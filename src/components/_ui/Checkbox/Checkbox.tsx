import classNames from 'classnames'
import React, { forwardRef } from 'react'

import type { CheckboxProps } from './Checkbox.props'

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(props, ref) {
  const { label, classWrapper, ...otherProps } = props

  return (
    <label className={classNames('checkbox', classWrapper)}>
      <input
        ref={ref}
        type="checkbox"
        className="checkbox__input"
        {...otherProps}
      />
      <div className="checkbox__block">
        <span className="checkbox__checkmark checkbox__checkmark--default">
          <svg>
            <use href="/img/sprite.svg#checkbox-default"></use>
          </svg>
        </span>
        <span className="checkbox__checkmark checkbox__checkmark--active">
          <svg>
            <use href="/img/sprite.svg#checkbox-active"></use>
          </svg>
        </span>
      </div>

      {label && <div className="checkbox__value">{label}</div>}
    </label>
  )
})
