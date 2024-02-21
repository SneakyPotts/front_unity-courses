import classNames from 'classnames'
import React, { forwardRef } from 'react'

import type { RadioProps } from './Radio.props'

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(props, ref) {
  const { label, border, classWrapper, ...otherProps } = props

  return (
    <label className={classNames('radio', classWrapper, { '--no-border': !border })}>
      <input
        ref={ref}
        type="radio"
        className="radio__input"
        {...otherProps}
      />

      {border && <div className="radio__border"></div>}
      <div className="radio__block">
        <span className="radio__checkmark radio__checkmark--default">
          <svg>
            <use href="/img/sprite.svg#radio-default"></use>
          </svg>
        </span>
        <span className="radio__checkmark radio__checkmark--active">
          <svg>
            <use href="/img/sprite.svg#radio-active"></use>
          </svg>
        </span>
      </div>
      <span className="radio__text">{label}</span>
    </label>
  )
})
