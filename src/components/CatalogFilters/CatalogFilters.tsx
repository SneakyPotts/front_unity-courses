import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'

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

  // const createQueryString = useCallback(
  //   (name: string, value: string) => {
  //     const params = new URLSearchParams(searchParams.toString())
  //     params.set(name, value)
  //
  //     return params.toString()
  //   },
  //   [searchParams],
  // )

  const handleChange = (name: string, value: string | boolean) => {
    const params = new URLSearchParams(searchParams.toString())

    if (params.has(name)) {
      const currentValue = params.get(name)
      const newValue = currentValue?.split(',').filter((v) => v !== value.toString()) || []

      !!newValue?.length ? params.delete(name) : params.set(name, newValue?.join(','))

      router.replace(`${pathname}?${params.toString()}`)
    } else {
      params.set(name, value.toString())

      router.replace(`${pathname}?${params.toString()}`)
    }
  }

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
            {/*<FilterBlock*/}
            {/*  {...filtersRatings}*/}
            {/*  handler={() => {}}*/}
            {/*/>*/}

            {/*ratings*/}
            <p className={'courses-catalog__subtitle'}>{filtersRatings.title}</p>
            <ul className={classNames('courses-catalog__list', filtersRatings.extraClass, '--open')}>
              {filtersRatings.filters.map((ratingItem, i) => (
                <li key={ratingItem.id}>
                  <Radio
                    classWrapper={'some-wrapper-class courses-catalog__item'}
                    label={ratingItem.title}
                    name="rating"
                    value={5 - 0.5 * (i + 1)}
                  />
                </li>
              ))}
            </ul>

            {/*other filters*/}
            {/*{[...filtersList, ...(filters ?? [])]?.map((filterBlock, index) => (*/}
            {/*  <Fragment key={`${index}${filterBlock.title}`}>*/}
            {/*    <p className={'courses-catalog__subtitle'}>{filterBlock.title}</p>*/}
            {/*    <ul className={classNames('courses-catalog__list', filterBlock?.extraClass)}>*/}
            {/*      {filterBlock.filters.map((filterItem) => (*/}
            {/*        <li key={filterItem.id}>*/}
            {/*          <Checkbox*/}
            {/*            classWrapper={'some-wrapper-class courses-catalog__item'}*/}
            {/*            label={filterItem.title}*/}
            {/*            onChange={() => handleChange(filterBlock.name, filterItem.value)}*/}
            {/*          />*/}
            {/*        </li>*/}
            {/*      ))}*/}
            {/*    </ul>*/}
            {/*  </Fragment>*/}
            {/*))}*/}

            {[...filtersList, ...(filters ?? [])].map((filterBlock, index) => (
              <FilterBlock
                key={`${index}${filterBlock.title}`}
                {...filterBlock}
                handler={(value) => handleChange(filterBlock.name, value)}
              />
            ))}
          </div>
          <div className={'courses-catalog__update'}>
            <Button className={'some_button courses-catalog__update-btn'}>скинути</Button>
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

function FilterBlock({ isRating, handler, initialActive, ...data }: FilterBlockProps) {
  const panelRef = useRef<HTMLUListElement>(null)
  const enableTransition = useRef<boolean>(!initialActive)

  const [isOpen, setIsOpen] = useState(false)
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
          className={'courses-catalog__subtitle-btn'}
          onClick={toggleHandler}
        >
          <svg>
            <use href="/img/sprite.svg#coure-filter-arrow"></use>
          </svg>
        </button>
      </p>
      <ul
        ref={panelRef}
        className={classNames('courses-catalog__list', data.extraClass, { '--open': isOpen, '--animate': enableTransition })}
        style={{ maxHeight: isOpen ? blockHeight : 0 }}
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
                onChange={() => handler(data.name, filterItem.value)}
              />
            )}
          </li>
        ))}
      </ul>
    </>
  )
}
