import Pagination from 'rc-pagination'
import React from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import type { AppPaginationProps } from './AppPagination.props'
import './styles.scss'

export function AppPagination({ ...props }: AppPaginationProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const handleOnChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (page === 1) {
      params.delete('page')
      router.push(`${pathname}?${params.toString()}`, { scroll: true })
    } else {
      params.set('page', page.toString())
      router.push(`${pathname}?${params.toString()}`, { scroll: true })
    }
  }

  return (
    <Pagination
      {...props}
      className={'courses-catalog__paginations-list'}
      defaultCurrent={1}
      hideOnSinglePage
      showPrevNextJumpers={true}
      locale={{
        prev_page: 'Попередня сторінка',
        next_page: 'Наступна сторінка',
      }}
      prevIcon={
        <button
          type="button"
          className="courses-catalog__paginations-btn"
        >
          <svg className="courses-catalog__paginations-svg">
            <use href="/img/sprite.svg#arrow-left"></use>
          </svg>
        </button>
      }
      nextIcon={
        <button
          type="button"
          className="courses-catalog__paginations-btn"
        >
          <svg className="courses-catalog__paginations-svg">
            <use href="/img/sprite.svg#arrow-right"></use>
          </svg>
        </button>
      }
      current={Number(searchParams.get('page') || 1)}
      onChange={handleOnChange}
    />
  )
}

// <div className={'courses-catalog__paginations'}>
//   <ul className={'courses-catalog__paginations-list'}>
//     <li className={'courses-catalog__paginations-item courses-catalog__paginations--active'}>1</li>
//     <li className={'courses-catalog__paginations-item'}>2</li>
//     <li className={'courses-catalog__paginations-item'}>3</li>
//     <li className={'courses-catalog__paginations-item'}>4</li>
//   </ul>
// </div>
