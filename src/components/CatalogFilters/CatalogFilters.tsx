import classNames from 'classnames'
import React, { useRef } from 'react'
import { useToggle } from 'usehooks-ts'

import { useSearchParams } from 'next/navigation'

import { Button } from '_ui/Button'
import { Checkbox } from '_ui/Checkbox'
import { Radio } from '_ui/Radio'

import { filtersList, filtersRatings } from './CatalogFilters.data'
import type { CatalogFiltersProps, FilterBlockProps } from './CatalogFilters.props'

export function CatalogFilters({ filters, handler, reset }: CatalogFiltersProps) {
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
            {[filtersRatings, ...filtersList, ...(filters ?? [])].map((filterBlock, index) => (
              <FilterBlock
                key={`${index}${filterBlock.title}`}
                {...filterBlock}
                handler={(value) => handler(filterBlock.name, value)}
                name={filterBlock.name}
                // isRating={filterBlock.name === 'rating'}
                initialActive={filterBlock.name === 'rating'}
              />
            ))}
          </div>
          <div className={'courses-catalog__update'}>
            <Button
              className={'some_button courses-catalog__update-btn'}
              onClick={reset}
            >
              скинути
            </Button>
          </div>
          <div className="courses-catalog__buttons close">
            <Button className={'some_button'}>застосувати</Button>

            <Button
              variant={'border'}
              className={'some_button courses-catalog__buttons-btn'}
              onClick={reset}
            >
              скинути фільтри
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function FilterBlock({ isRating, handler, initialActive = false, name, ...data }: FilterBlockProps) {
  const searchParams = useSearchParams()

  const panelRef = useRef<HTMLUListElement>(null)

  const [isOpen, setIsOpen] = useToggle(initialActive)

  return (
    <div className={classNames('courses-catalog__block', { '--open': isOpen })}>
      <p className={'courses-catalog__subtitle'}>
        <span>{data.title}</span>
        <button
          className={'courses-catalog__subtitle-btn'}
          onClick={setIsOpen}
        >
          <svg>
            <use href="/img/sprite.svg#coure-filter-arrow"></use>
          </svg>
        </button>
      </p>
      <div className={classNames('courses-catalog__list-wrapper', { '--open': isOpen })}>
        <ul
          ref={panelRef}
          className={classNames('courses-catalog__list', data.extraClass)}
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
                  value={filterItem.value.toString()}
                  onChange={() => handler(filterItem.value)}
                  checked={!!searchParams.get(name)?.split(',')?.includes(filterItem.value.toString())}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
