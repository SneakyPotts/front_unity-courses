import classNames from 'classnames'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Button } from '_ui/Button'
import { Checkbox } from '_ui/Checkbox'
import { Radio } from '_ui/Radio'

import { filtersList, filtersRatings } from './CatalogFilters.data'
import type { CatalogFiltersProps, FilterBlockProps } from './CatalogFilters.props'

export function CatalogFilters({ filters }: CatalogFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleChange = useCallback(
    (name: string, value: string | boolean) => {
      const params = new URLSearchParams(searchParams.toString())

      if (params.has(name)) {
        const currentValue = params.get(name)
        const valueArr = currentValue?.split(',') || []
        const newValue = currentValue?.includes(value.toString()) ? valueArr?.filter((v) => v !== value.toString()) : [...valueArr, value.toString()]

        !newValue?.length ? params.delete(name) : params.set(name, newValue.join(','))

        router.replace(`${pathname}?${params.toString()}`)
      } else {
        params.set(name, value.toString())

        router.replace(`${pathname}?${params.toString()}`)
      }
    },
    [searchParams],
  )

  return (
    <div className={'courses-catalog__body'}>
      <div className={'courses-catalog__filter '}>
        <div className={'courses-catalog__filter-body'}>
          <h2 className={'courses-catalog__title'}>Фільтрувати</h2>
          <div className={'courses-catalog__mobile'}>
            <h2 className={'courses-catalog__mobile-title'}>Фільтр</h2>
            <button className={'courses-catalog__mobile-btn'}>
              <svg>
                <use href="/img/sprite.svg#close"></use>
              </svg>
            </button>
          </div>
          <div className={'courses-catalog__inner'}>
            <FilterBlock
              {...filtersRatings}
              handler={() => {}}
              isRating
              initialActive
            />

            {[...filtersList, ...(filters ?? [])].map((filterBlock, index) => (
              <FilterBlock
                key={`${index}${filterBlock.title}`}
                {...filterBlock}
                handler={(value) => handleChange(filterBlock.name, value)}
                initialActive
              />
            ))}
          </div>
          <div className="courses-catalog__buttons close">
            <Button className={'some_button'}>застосувати</Button>

            <Button
              className={'some_button courses-catalog__buttons-btn'}
              variant={'border'}
            >
              скинути фільтри
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function FilterBlock({ isRating, handler, initialActive = false, ...data }: FilterBlockProps) {
  const panelRef = useRef<HTMLUListElement>(null)
  const enableTransition = useRef<boolean>(!initialActive)

  const [isOpen, setIsOpen] = useState(initialActive)
  const [blockHeight, setBlockHeight] = useState(0)

  const toggleHandler = () => {
    setIsOpen((prev) => !prev)

    if (!enableTransition.current) {
      enableTransition.current = true
    }
  }

  useEffect(() => {
    if (panelRef?.current) {
      setBlockHeight(panelRef.current?.scrollHeight)
    }
  }, [])

  return (
    <>
      <p className={'courses-catalog__subtitle'}>
        <span>{data.title}</span>
        <button
          onClick={toggleHandler}
          style={{ width: 20, height: 20, backgroundColor: 'tomato' }}
        >
          x
        </button>
      </p>
      <ul
        ref={panelRef}
        className={classNames('courses-catalog__list', data.extraClass, {
          '--open': isOpen,
          '--animate': enableTransition.current,
        })}
        style={enableTransition.current ? { maxHeight: isOpen ? blockHeight : 0 } : { maxHeight: data.filters.length * 20 + (data.filters.length - 1) * 12 }}
      >
        {data.filters.map((filterItem, i) => (
          <li key={filterItem.id}>
            {isRating ? (
              <Radio
                classWrapper={'some-wrapper-class courses-catalog__item'}
                label={filterItem.title}
                name="rating"
                value={5 - 0.5 * (i + 1)}
              />
            ) : (
              <Checkbox
                classWrapper={'some-wrapper-class courses-catalog__item'}
                label={filterItem.title}
                onChange={() => handler(filterItem.value)}
              />
            )}
          </li>
        ))}
      </ul>
    </>
  )
}
