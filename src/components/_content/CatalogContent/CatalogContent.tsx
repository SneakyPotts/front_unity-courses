'use client'

import classNames from 'classnames'
import React, { Fragment, useContext } from 'react'

import { CatalogFilterPopup } from '@components/CatalogFilterPopup'
import { appContext } from '@components/Context/context'
import { CourseCatalogItem } from '@components/CourseCatalogItem'
import { useSetHeaderParams } from '@hooks/useSetHeaderParams'

import { Button } from '_ui/Button'
import { Checkbox } from '_ui/Checkbox'
import { PageWrapper } from '_ui/PageWrapper'
import { Radio } from '_ui/Radio'

import { filtersList, filtersRatings } from '_content/CatalogContent/CatalogContent.data'

import type { CatalogContentProps } from './CatalogContent.props'

export function CatalogContent({ data, filters }: CatalogContentProps) {
  const { asideIsOpen } = useContext(appContext)

  useSetHeaderParams({ title: 'Каталог курсів' })

  return (
    <PageWrapper>
      <section className={'courses-catalog'}>
        <div className={'courses-catalog__wrapper'}>
          {!asideIsOpen && (
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
                    {/*ratings*/}
                    <p className={'courses-catalog__subtitle'}>{filtersRatings.title}</p>
                    <ul className={classNames('courses-catalog__list', filtersRatings.extraClass)}>
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
                    {[...filtersList, ...(filters ?? [])]?.map((filterBlock, index) => (
                      <Fragment key={`${index}${filterBlock.title}`}>
                        <p className={'courses-catalog__subtitle'}>{filterBlock.title}</p>
                        <ul className={classNames('courses-catalog__list', filterBlock?.extraClass)}>
                          {filterBlock.filters.map((filterItem) => (
                            <li key={filterItem.id}>
                              <Checkbox
                                classWrapper={'some-wrapper-class courses-catalog__item'}
                                label={filterItem.title}
                              />
                            </li>
                          ))}
                        </ul>
                      </Fragment>
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
          )}

          <div className={'courses-catalog__catalog'}>
            <CatalogFilterPopup />

            <div className="courses-catalog__cards">
              {data?.results?.map((v) => (
                <CourseCatalogItem
                  key={v.id}
                  {...v}
                />
              ))}
              {/*{courseMockData.map((v) => (*/}
              {/*  <CourseCatalogItem*/}
              {/*    key={v.id}*/}
              {/*    {...v}*/}
              {/*  />*/}
              {/*))}*/}
              {/*<CourseCardPaid />*/}
              {/*<CourseCardPaidPromotion />*/}
              {/*<CourseCardFree />*/}
            </div>
            <div className={'courses-catalog__paginations'}>
              <ul className={'courses-catalog__paginations-list'}>
                <li className={'courses-catalog__paginations-item courses-catalog__paginations--active'}>1</li>
                <li className={'courses-catalog__paginations-item'}>2</li>
                <li className={'courses-catalog__paginations-item'}>3</li>
                <li className={'courses-catalog__paginations-item'}>4</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
