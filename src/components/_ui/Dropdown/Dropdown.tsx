import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

import type { DropdownProps } from './Dropdown.props'

export function Dropdown({ initValue, valuesList, value, onChange }: DropdownProps) {
  const dropdown = useRef<HTMLDivElement>(null)

  const [show, setShow] = useState(false)
  const [currVal, setCurrVal] = useState<string | number>(value || initValue || '')

  const handleHideDropdown = () => setShow(false)

  const handleToggleShowDropdown = () => setShow((p) => !p)

  const handleChange = (val: string | number) => {
    setCurrVal(val)
    onChange && onChange(val)
    handleHideDropdown()
  }

  useEffect(() => {
    setCurrVal(value || initValue || '')
  }, [initValue, value])

  useOnClickOutside(dropdown, handleHideDropdown)

  return (
    <div
      ref={dropdown}
      className="dropdown"
    >
      <div
        className="dropdown__nav"
        onClick={handleToggleShowDropdown}
      >
        <span className="dropdawn__button">{currVal}</span>
        <span className={'select__top-svg-wrapper'}>
          <svg className="select__top-svg">
            <use href="/img/sprite.svg#dropdown-arrow"></use>
          </svg>
        </span>
      </div>
      <div
        className={classNames('dropdown__overlay', { active: show })}
        onClick={handleHideDropdown}
      ></div>
      <ul className={classNames('dropdawn__list', { 'dropdawn__list--visible': show })}>
        {valuesList?.map((v, i) => (
          <li
            key={i}
            className={classNames('dropdawn__list-item', { active: v === currVal })}
            onClick={() => handleChange(v)}
          >
            {v}
          </li>
        ))}
      </ul>
    </div>
  )
}
