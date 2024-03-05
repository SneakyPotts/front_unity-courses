import classNames from 'classnames'
import React, { useRef, useState } from 'react'
import { usePopper } from 'react-popper'
import { useOnClickOutside } from 'usehooks-ts'

import type { MarkSelectProps } from './MarkSelect.props'

const marks = Array.from({ length: 12 }, (_, i) => i + 1)

export function MarkSelect({ handler, value = 0, setValue, className }: MarkSelectProps) {
  const select = useRef(null)

  const [isOpen, setIsOpen] = useState(false)
  const [mark, setMark] = useState(value)

  const [referenceElement, setReferenceElement] = useState<any>(null)
  const [popperElement, setPopperElement] = useState<any>(null)

  const handleSetMark = (mark: number) => {
    setMark(mark)
    setValue && setValue(mark)
    setIsOpen(false)
  }

  const handleSendMark = () => {
    handler && handler(mark)
    setMark(0)
  }

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
    modifiers: [{ name: 'offset', options: { offset: [0, 4] } }],
  })

  useOnClickOutside(select, () => setIsOpen(false))

  return (
    <div
      ref={select}
      className={classNames('from-group', className)}
    >
      <div className="dropdown">
        <div className="dropdown__nav">
          <div
            ref={setReferenceElement}
            className={classNames('dropdawn__button', { '--no-handler': !handler })}
            onClick={() => setIsOpen((p) => !p)}
          >
            <span className={'dropdawn__button-value'}>{mark}</span>
            <div className={'dropdawn__button-svg--wrapper'}>
              <svg>
                <use href="/img/sprite.svg#select-errow"></use>
              </svg>
            </div>
          </div>
          {handler && (
            <button
              className={classNames('dropdawn__button-check', { 'dropdawn__button-check--active': !!mark })}
              onClick={handleSendMark}
            >
              <svg>
                <use href="/img/sprite.svg#check"></use>
              </svg>
            </button>
          )}
        </div>
        {isOpen && (
          <ul
            ref={setPopperElement}
            className={classNames('dropdawn__list', 'dropdawn__list--visible')}
            {...attributes.popper}
            style={styles.popper}
          >
            {marks.map((v, i) => (
              <li
                key={`${v}-${i}`}
                className={classNames('dropdawn__list-item', { '--no-handler': !handler })}
                onClick={() => handleSetMark(v)}
              >
                {v}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
