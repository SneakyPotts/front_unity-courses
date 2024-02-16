import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import SimpleBar from 'simplebar-react'
import { useOnClickOutside } from 'usehooks-ts'

import { Subject } from '@assets/types/globals'

import type { StatisticDropdownProps, TAllSubjects } from './StatisticDropdown.props'

export function StatisticDropdown({ list, placeholder = '', onChange }: StatisticDropdownProps) {
  const select = useRef<HTMLDivElement>(null)

  const [active, setActive] = useState(false)
  const [title, setTitle] = useState(placeholder)

  const handleChange = (args: Subject | TAllSubjects) => {
    setTitle(`${args.title}`)
    onChange && onChange(args.id ?? '')

    handleClose()
  }

  const handleClose = () => setActive(false)
  const handleToggleShow = () => setActive((prev) => !prev)

  useOnClickOutside(select, handleClose)

  useEffect(() => {
    setTitle('По усім предметам')
  }, [])

  return (
    <div
      className={classNames('statistics-block__select select select--small', { 'select--active': active })}
      ref={select}
    >
      <div
        className="select__top"
        onClick={handleToggleShow}
      >
        <span className="select__value">{title}</span>
        <svg className="select__top-svg">
          <use xlinkHref="/img/sprite.svg#arrow-up"></use>
        </svg>
      </div>

      <div className="select__bottom">
        <div className="select__wrapper">
          <SimpleBar className="select_list">
            <ul>
              {[{ id: '', title: 'По усім предметам' }, ...(list ?? [])].map((item) => (
                <li
                  key={item.id}
                  className={classNames('select__item', { 'select__item--chosen': title === item.title })}
                  onClick={() => handleChange(item)}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </SimpleBar>
        </div>
      </div>
    </div>
  )
}
