'use client'

import React, { useCallback, useContext } from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { CatalogFilterPopup } from '@components/CatalogFilterPopup'
import { CatalogFilters } from '@components/CatalogFilters'
import { appContext } from '@components/Context/context'
import { CourseCatalogItem } from '@components/CourseCatalogItem'
import { useSetHeaderParams } from '@hooks/useSetHeaderParams'

import { AppPagination } from '_ui/AppPagination'
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

        router.push(`${pathname}?${params.toString()}`, {
          scroll: false,
        })
      } else {
        params.set(name, value.toString())

        router.push(`${pathname}?${params.toString()}`, {
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

            {data?.count && (
              <AppPagination
                pageSize={12}
                total={data.count}
              />
            )}
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
