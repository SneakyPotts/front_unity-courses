'use client'

import React from 'react'

import { CourseCatalogItem } from '@components/CourseCatalogItem'
import { useSetHeaderParams } from '@hooks/useSetHeaderParams'

import { AppPagination } from '_ui/AppPagination'

import type { WishlistPageContentProps } from './WishlistPageContent.props'

export function WishlistPageContent({ data }: WishlistPageContentProps) {
  useSetHeaderParams({ title: 'Список бажань' })

  return (
    <section className={'courses-catalog'}>
      <div className={'courses-catalog__wrapper'}>
        <div className={'courses-catalog__catalog'}>
          {!!data?.courses.length ? (
            <div className="courses-catalog__cards">
              {data?.courses?.map((v) => (
                <CourseCatalogItem
                  key={v.id}
                  {...v}
                  purchased={false}
                  color={v.color}
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

          {/*TODO: add pagination*/}
          {/*{data?.count && (*/}
          {/*  <AppPagination*/}
          {/*    pageSize={12}*/}
          {/*    total={data.count}*/}
          {/*  />*/}
          {/*)}*/}
        </div>
      </div>
    </section>
  )
}
