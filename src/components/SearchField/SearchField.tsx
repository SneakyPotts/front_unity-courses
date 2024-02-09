import React from 'react'

import type { SearchFieldProps } from './SearchField.props'

export function SearchField({}: SearchFieldProps) {
  return (
    <div className={'courses-catalog__search'}>
      <input
        className={'input courses-catalog__search-input'}
        placeholder={'Почніть вводити текст'}
        type=""
      />
      <svg className="nav__link-svg courses-catalog__search-svg">
        <use href="/img/sprite.svg#search"></use>
      </svg>
    </div>
  )
}
