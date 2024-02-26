import React, { useContext, useEffect, useRef, useState } from 'react'
import { usePopper } from 'react-popper'
import { useOnClickOutside } from 'usehooks-ts'

import { useSearchParams } from 'next/navigation'

import { filtersList, filtersRatings } from '@components/CatalogFilters/CatalogFilters.data'
import { appContext } from '@components/Context/context'
import { SearchField } from '@components/SearchField'

import { Button } from '_ui/Button'
import { Checkbox } from '_ui/Checkbox'

import type { CatalogFilterPopupProps, FilterActiveTagsProps, TActiveTag } from './CatalogFilterPopup.props'

export function CatalogFilterPopup({ filters, handler, reset }: CatalogFilterPopupProps) {
  const searchParams = useSearchParams()

  const { asideIsOpen } = useContext(appContext)

  const filterBlocksList = [filtersRatings, ...filtersList, ...(filters ?? [])]

  const container = useRef<HTMLDivElement | null>(null)

  const [isOpen, setIsOpen] = useState(false)

  const [activeFilter, setActiveFilter] = useState('')
  const [activeTags, setActiveTags] = useState<TActiveTag[]>([])

  const [referenceElement, setReferenceElement] = useState<any>(null)
  const [popperElement, setPopperElement] = useState<any>(null)

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
    modifiers: [{ name: 'offset', options: { offset: [0, -1] } }],
  })

  const handleChange = (name: string, value: string | boolean) => {
    handler(name, value)

    const block = filterBlocksList.find((block) => block.name === name)
    const item = block?.filters?.find((filter) => filter.value === value)

    const isIncluding = activeTags.findIndex((tag) => tag.name === block!.name && tag.value === item!.value.toString())

    setActiveTags((prev) =>
      isIncluding >= 0 ? prev.filter((_, index) => index !== isIncluding) : [...prev, { title: item!.title, name: block!.name, value: item!.value.toString() }],
    )
  }

  const handleRemove = (name: string, value: string | boolean) => {
    handler(name, value)

    setActiveTags((prev) => prev.filter((f) => f.value !== value))
  }

  const handleReset = () => {
    reset()
    setActiveTags([])
  }

  useEffect(() => {
    setIsOpen(false)
  }, [asideIsOpen])

  useEffect(() => {
    setActiveFilter('')
  }, [])

  useOnClickOutside(container, () => setIsOpen(false))

  return (
    <div
      ref={setReferenceElement}
      className="courses-catalog__menu"
    >
      <div ref={container}>
        <Button
          className={'some_button courses-catalog__menu-btn'}
          variant="border"
          disabled={!asideIsOpen}
          onClick={() => setIsOpen((p) => !p)}
        >
          <svg className="courses-catalog__menu-svg">
            <use href="img/sprite.svg#filter-course"></use>
          </svg>
          <span> фільтр</span>
        </Button>

        {isOpen && (
          <div
            ref={setPopperElement}
            className="courses-catalog__unit"
            {...attributes.popper}
            style={styles.popper}
          >
            <div className="courses-catalog__searchs">
              <div className="courses-catalog__searchs-head">
                <p className="courses-catalog__searchs-text">Фільтр</p>
                <button
                  className="courses-catalog__searchs-btn"
                  onClick={handleReset}
                >
                  скинути
                </button>
              </div>
              {!!searchParams.size && (
                <FilterActiveTags
                  activeTags={activeTags}
                  setActiveTags={setActiveTags}
                  handleRemove={handleRemove}
                  filters={filterBlocksList}
                />
              )}
              <ul className={'courses-catalog__searchs-list'}>
                {filterBlocksList.map((v) => (
                  <li
                    key={v.title}
                    className={'courses-catalog__searchs-item'}
                    onClick={() => setActiveFilter((p) => (p === v.name ? '' : v.name))}
                  >
                    {v.title}
                    <svg className="courses-catalog__search__item-svg">
                      <use href="/img/sprite.svg#arrow-right"></use>
                    </svg>
                  </li>
                ))}
              </ul>
            </div>
            {filterBlocksList.map(
              (v) =>
                activeFilter === v.name && (
                  <div
                    key={v.name}
                    className="courses-catalog__crisper"
                  >
                    <p className={'courses-catalog__crisper-text'}>{v.title}</p>
                    <ul className="courses-catalog__crisper-list">
                      {v.filters.map((f) => (
                        <li
                          key={f.id}
                          className={'courses-catalog__crisper-item'}
                        >
                          <Checkbox
                            classWrapper={'some-wrapper-class'}
                            label={f.title}
                            onChange={() => handleChange(v.name, f.value)}
                            checked={!!searchParams.get(v.name)?.includes(f.value.toString())}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                ),
            )}
          </div>
        )}
      </div>

      {/* TODO: there can be sort */}

      <div className="courses-catalog__palen">
        <SearchField />
      </div>
    </div>
  )
}

function FilterActiveTags({ activeTags, setActiveTags, handleRemove, filters }: FilterActiveTagsProps) {
  const searchParams = useSearchParams()

  useEffect(() => {
    setActiveTags([])

    for (const key of searchParams.keys()) {
      const block = filters.find((block) => block.name === key)

      searchParams
        .get(key)!
        .split(',')
        .forEach((value) => {
          const item = block?.filters?.find((filter) => filter.value.toString() === value)

          setActiveTags((p) => [...p, { title: item!.title, name: key, value: value }])
        })
    }
  }, [])

  return (
    <div className={'courses-catalog__area'}>
      {/* TODO: there can be search */}

      <ul className={'courses-catalog__area-favorites'}>
        {activeTags.map((v, i) => (
          <li
            key={`${v.value}-${i}`}
            className={'courses-catalog__area-item'}
          >
            {v.title}
            <button onClick={() => handleRemove(v.name, v.value)}>
              <svg className="courses-catalog__area-svg">
                <use href="/img/sprite.svg#close"></use>
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

// -- SEARCH INPUT --
// <div className={'courses-catalog__area-input'}>
//   <input
// className={classNames({ '--active': !!0 })}
// type="text"
// placeholder={'Почніть вводити текст'}
// />
// <svg className="courses-catalog__area-search">
//   <use href="/img/sprite.svg#search"></use>
// </svg>
// </div>

// -- SORT TABS --
// <nav className="courses-catalog__navigation">
//   <ul className={'courses-catalog__tabs'}>
//     {tabs.map((tab, index) => (
//       <li key={`${index}${tab.title}`}>
//         <button
//           className={classNames('courses-catalog__tab', { 'courses-catalog__tab--active': activeTab === index + 1 })}
//           onClick={() => setActiveTab(index + 1)}
//         >
//           {tab.title}
//         </button>
//       </li>
//     ))}
//   </ul>
// </nav>
