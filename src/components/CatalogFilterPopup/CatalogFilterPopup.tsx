import React, { useContext, useRef, useState } from 'react'
import { usePopper } from 'react-popper'
import { useOnClickOutside } from 'usehooks-ts'

import { appContext } from '@components/Context/context'
import { SearchField } from '@components/SearchField'

import { Button } from '@UI/Button'
import { Checkbox } from '@UI/Checkbox'

import type { CatalogFilterPopupProps } from './CatalogFilterPopup.props'

export function CatalogFilterPopup({}: CatalogFilterPopupProps) {
  const { asideIsOpen } = useContext(appContext)

  const container = useRef<HTMLDivElement | null>(null)

  const [isOpen, setIsOpen] = useState(false)

  const [referenceElement, setReferenceElement] = useState<any>(null)
  const [popperElement, setPopperElement] = useState<any>(null)

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
    modifiers: [{ name: 'offset', options: { offset: [0, -1] } }],
  })

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
                <button className="courses-catalog__searchs-btn">скинути</button>
              </div>
              <div className={'courses-catalog__area'}>
                {/* строка поиска */}
                <div className={'courses-catalog__area-input'}>
                  <input
                    className={''}
                    type="text"
                    placeholder={'Почніть вводити текст'}
                  />
                  <svg className="courses-catalog__area-search">
                    <use href="/img/sprite.svg#search"></use>
                  </svg>
                </div>
                {/* область куда попадают выбранные курсы */}
                <ul className={'courses-catalog__area-favorites'}>
                  <li className={'courses-catalog__area-item'}>
                    Підготовка до ЗНО
                    <button>
                      <svg className="courses-catalog__area-svg">
                        <use href="/img/sprite.svg#close"></use>
                      </svg>
                    </button>
                  </li>
                  <li className={'courses-catalog__area-item'}>
                    IT
                    <button>
                      <svg className="courses-catalog__area-svg">
                        <use href="/img/sprite.svg#close"></use>
                      </svg>
                    </button>
                  </li>
                  <li className={'courses-catalog__area-item'}>
                    Право
                    <button>
                      <svg className="courses-catalog__area-svg">
                        <use href="/img/sprite.svg#close"></use>
                      </svg>
                    </button>
                  </li>
                  <li className={'courses-catalog__area-item'}>
                    Суспільні науки
                    <button>
                      <svg className="courses-catalog__area-svg">
                        <use href="/img/sprite.svg#close"></use>
                      </svg>
                    </button>
                  </li>
                </ul>
              </div>
              <ul className={'courses-catalog__searchs-list'}>
                <li className={'courses-catalog__searchs-item'}>
                  Рейтинг
                  <svg className="courses-catalog__search__item-svg">
                    <use href="/img/sprite.svg#arrow-right"></use>
                  </svg>
                </li>
                <li className={'courses-catalog__searchs-item'}>
                  Рейтинг
                  <svg className="courses-catalog__search__item-svg">
                    <use href="/img/sprite.svg#arrow-right"></use>
                  </svg>
                </li>
                <li className={'courses-catalog__searchs-item'}>
                  Рейтинг
                  <svg className="courses-catalog__search__item-svg">
                    <use href="/img/sprite.svg#arrow-right"></use>
                  </svg>
                </li>
                <li className={'courses-catalog__searchs-item'}>
                  Рейтинг
                  <svg className="courses-catalog__search__item-svg">
                    <use href="/img/sprite.svg#arrow-right"></use>
                  </svg>
                </li>
                <li className={'courses-catalog__searchs-item'}>
                  Рейтинг
                  <svg className="courses-catalog__search__item-svg">
                    <use href="/img/sprite.svg#arrow-right"></use>
                  </svg>
                </li>
                <li className={'courses-catalog__searchs-item'}>
                  Рейтинг
                  <svg className="courses-catalog__search__item-svg">
                    <use href="/img/sprite.svg#arrow-right"></use>
                  </svg>
                </li>
              </ul>
            </div>
            <div className="courses-catalog__crisper">
              <p className={'courses-catalog__crisper-text'}>Теми</p>
              <ul className="courses-catalog__crisper-list">
                <li className={'courses-catalog__crisper-item'}>
                  <Checkbox
                    classWrapper={'some-wrapper-class'}
                    label={'Some label checkbox'}
                  />
                </li>
                <li className={'courses-catalog__crisper-item'}>
                  <Checkbox
                    classWrapper={'some-wrapper-class'}
                    label={'Some label checkbox'}
                  />
                </li>
                <li className={'courses-catalog__crisper-item'}>
                  <Checkbox
                    classWrapper={'some-wrapper-class'}
                    label={'Some label checkbox'}
                  />
                </li>
                <li className={'courses-catalog__crisper-item'}>
                  <Checkbox
                    classWrapper={'some-wrapper-class'}
                    label={'Some label checkbox'}
                  />
                </li>
                <li className={'courses-catalog__crisper-item'}>
                  <Checkbox
                    classWrapper={'some-wrapper-class'}
                    label={'Some label checkbox'}
                  />
                </li>
                <li className={'courses-catalog__crisper-item'}>
                  <Checkbox
                    classWrapper={'some-wrapper-class'}
                    label={'Some label checkbox'}
                  />
                </li>
                <li className={'courses-catalog__crisper-item'}>
                  <Checkbox
                    classWrapper={'some-wrapper-class'}
                    label={'Some label checkbox'}
                  />
                </li>

                <li className={'courses-catalog__crisper-item'}>
                  <Checkbox
                    classWrapper={'some-wrapper-class'}
                    label={'Some label checkbox'}
                  />
                </li>
                <li className={'courses-catalog__crisper-item'}>
                  <Checkbox
                    classWrapper={'some-wrapper-class'}
                    label={'Some label checkbox'}
                  />
                </li>
                <li className={'courses-catalog__crisper-item'}>
                  <Checkbox
                    classWrapper={'some-wrapper-class'}
                    label={'Some label checkbox'}
                  />
                </li>
                <li className={'courses-catalog__crisper-item'}>
                  <Checkbox
                    classWrapper={'some-wrapper-class'}
                    label={'Some label checkbox'}
                  />
                </li>
                <li className={'courses-catalog__crisper-item'}>
                  <Checkbox
                    classWrapper={'some-wrapper-class'}
                    label={'Some label checkbox'}
                  />
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
      {/* <nav className="courses-catalog__navigation">
                  <ul className={'courses-catalog__tabs'}>
                    {tabs.map((tab, index) => (
                      <li key={`${index}${tab.title}`}>
                        <button
                          className={classNames('courses-catalog__tab', { 'courses-catalog__tab--active': activeTab === index + 1 })}
                          onClick={() => setActiveTab(index + 1)}
                        >
                          {tab.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav> */}
      <div className="courses-catalog__palen">
        <SearchField />
      </div>
    </div>
  )
}