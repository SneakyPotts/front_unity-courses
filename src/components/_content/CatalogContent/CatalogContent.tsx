'use client'

import React, { useCallback, useContext } from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { CatalogFilterPopup } from '@components/CatalogFilterPopup'
import { CatalogFilters } from '@components/CatalogFilters'
import { appContext } from '@components/Context/context'
import { CourseCatalogItem } from '@components/CourseCatalogItem'
import { useSetHeaderParams } from '@hooks/useSetHeaderParams'

import { PageWrapper } from '_ui/PageWrapper'

import type { CatalogContentProps } from './CatalogContent.props'

export function CatalogContent({ data, filters }: CatalogContentProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const { asideIsOpen } = useContext(appContext)

  useSetHeaderParams({ title: 'Каталог курсів' })

  const handleChange = useCallback(
    (name: string, value: string | boolean) => {
      const params = new URLSearchParams(searchParams.toString())

      if (params.has(name)) {
        const currentValue = params.get(name)
        const valueArr = currentValue?.split(',') || []
        const newValue = valueArr?.includes(value.toString()) ? valueArr?.filter((v) => v !== value.toString()) : [...valueArr, value.toString()]

        !newValue?.length ? params.delete(name) : params.set(name, newValue.join(','))

        router.replace(`${pathname}?${params.toString()}`, {
          scroll: false,
        })
      } else {
        params.set(name, value.toString())

        router.replace(`${pathname}?${params.toString()}`, {
          scroll: false,
        })
      }
    },
    [searchParams],
  )

  const handleFilterReset = () => {
    const params = new URLSearchParams(searchParams.toString())

    for (const key of params.keys()) {
      key !== 'search' && params.delete(key)
    }

    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <PageWrapper>
      <section className={'courses-catalog'}>
        <div className={'courses-catalog__wrapper'}>
          {!asideIsOpen && (
            <CatalogFilters
              filters={filters}
              handler={handleChange}
              reset={handleFilterReset}
            />
          )}

          <div className={'courses-catalog__catalog'}>
            <CatalogFilterPopup
              filters={filters}
              handler={handleChange}
              reset={handleFilterReset}
            />

            {!!data?.results.length ? (
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
            ) : (
              <div className={'courses-catalog__empty close'}>
                <div className="courses-catalog__empty-text">
                  <p>На ваш запит нічого не знайдено. Уточніть свій запит.</p>
                </div>
                <svg className={'courses-catalog__empty-svg'}>
                  <use href="/img/sprite.svg#course-magnifying"></use>
                </svg>
              </div>
            )}

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
