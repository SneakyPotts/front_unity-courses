'use client'

import React, { useContext } from 'react'

import { CatalogFilterPopup } from '@components/CatalogFilterPopup'
import { CatalogFilters } from '@components/CatalogFilters'
import { appContext } from '@components/Context/context'
import { CourseCatalogItem } from '@components/CourseCatalogItem'
import { useSetHeaderParams } from '@hooks/useSetHeaderParams'

import { PageWrapper } from '_ui/PageWrapper'

import type { CatalogContentProps } from './CatalogContent.props'

export function CatalogContent({ data, filters }: CatalogContentProps) {
  const { asideIsOpen } = useContext(appContext)

  useSetHeaderParams({ title: 'Каталог курсів' })

  return (
    <PageWrapper>
      <section className={'courses-catalog'}>
        <div className={'courses-catalog__wrapper'}>
          {!asideIsOpen && <CatalogFilters filters={filters} />}

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

            <div className={'courses-catalog__empty close'}>
              <div className="courses-catalog__empty-text">
                <p>На ваш запит нічого не знайдено. Уточніть свій запит</p>
              </div>
              <svg className={'courses-catalog__empty-svg'}>
                <use href="/img/sprite.svg#course-magnifying"></use>
              </svg>
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
