import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'

import type { AccordionProps } from './Accordion.props'

export function Accordion({ order, title, children, onActive }: AccordionProps) {
  const ref = useRef<HTMLDivElement>(null)

  const [maxHeight, setMaxHeight] = useState<number>(0)
  const [isActive, setIsActive] = useState<boolean>(false)

  const toggleActive = () => {
    const newValue = !isActive
    setIsActive(newValue)
    onActive && onActive(newValue)
  }

  useEffect(() => {
    setMaxHeight(ref?.current?.scrollHeight || 0)
  }, [children])

  return (
    <div className={classNames('subject__plan plan', { 'plan--active': isActive })}>
      <button
        className="plan__top"
        aria-expanded={isActive}
        aria-label="Відкрити розділ"
        onClick={toggleActive}
      >
        <div className="plan__left">
          {!!order && <span className="plan__number">{order}</span>}
          {title}
        </div>
        <div className="plan__arrow">
          <svg className="plan__arrow-svg">
            <use href="/img/sprite.svg#arrow-down-mini"></use>
          </svg>
        </div>
      </button>
      <div
        ref={ref}
        className="plan__bottom"
        style={{ maxHeight: isActive ? maxHeight : 0 + 'px' }}
      >
        {children}
      </div>
    </div>
  )
}
