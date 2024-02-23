import debounce from 'debounce'
import React, { type ChangeEventHandler, useCallback, useState } from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import type { SearchFieldProps } from './SearchField.props'

export function SearchField({}: SearchFieldProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [inputValue, setInputValue] = useState(searchParams.get('search') ?? '')

  const handleSearch = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString())

      !!value.trim().length ? params.set('search', value.trim()) : params.delete('search')

      router.replace(`${pathname}?${params.toString()}`)
    },
    [searchParams],
  )

  const handleSearchDebounce = debounce(handleSearch, 300)

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputValue(event.target.value)
    handleSearchDebounce(event.target.value)
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
