import React from 'react'

import type { TextareaProps } from './Textarea.props'

export function Textarea({}: TextareaProps) {
  return (
    <div className={'textarea'}>
      {/* <div>export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(props, ref) {
  const { label, className, ...otherProps } = props */}

  return (
    <div className="document-block document-block--comment">
      <div className="document-block__top">
        <h3 className="document-block__title">{label}</h3>
      </div>

      <textarea
        ref={ref}
        className={classNames('document-block__input input input--textarea', className)}
        {...otherProps}
        data-input={''}
      ></textarea>
    </div>
  )
})
</div>
    </div>
  )
}
