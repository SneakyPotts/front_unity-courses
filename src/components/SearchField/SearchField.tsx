import React, { type ChangeEventHandler, useState } from 'react'

import type { SearchFieldProps } from './SearchField.props'

export function SearchField({ value = '', onChange }: SearchFieldProps) {
  const [inputValue, setInputValue] = useState(value)

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputValue(event.target.value)
    onChange(event.target.value)
  }

  return (
    <div className={'courses-catalog__search'}>
      <input
        type="text"
        className={'input courses-catalog__search-input'}
        placeholder={'Почніть вводити текст'}
        value={inputValue}
        onChange={handleInputChange}
      />
      <svg className="nav__link-svg courses-catalog__search-svg">
        <use href="/img/sprite.svg#search"></use>
      </svg>
    </div>
  )
}
