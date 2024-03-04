'use client'

import classNames from 'classnames'
import { format } from 'date-fns'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useToggle } from 'usehooks-ts'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { dynamicOptions } from '@assets/constants'
import { imgBlur } from '@assets/utils'
import { appContext } from '@components/Context/context'
import { ReviewItem } from '@components/ReviewItem'
import { useSetHeaderParams } from '@hooks/useSetHeaderParams'
import type { TReviewItem } from '@http/courses/type'
import { Rating } from '@smastrom/react-rating'

import { TeacherForCourse } from '_ui/TeacherForCourse'

import type { ReviewsContentProps } from './ReviewsContent.props'

const ReviewAdd = dynamic(() => import('@components/ReviewAdd').then((mod) => mod.ReviewAdd), {
  ...dynamicOptions,
  ssr: false,
})

export function ReviewsContent({ data }: ReviewsContentProps) {
  const params = useParams()

  const { profile } = useContext(appContext)

  const [reviewsList, setReviewsList] = useState<TReviewItem[]>(data?.reviews.results || [])
  const [allowAdd, setAllowAdd] = useState(!data?.my_rating)

  const handleReviewAdd = (review: TReviewItem) => {
    setReviewsList((p) => [review, ...p])
    setAllowAdd(false)
  }

  useSetHeaderParams({
    title: 'Відгуки з курсу',
    titleBefore: (
      <Link
        href={`/courses/${params.course_id}`}
        className="header__manual"
      >
        <svg className="header__manual-svg">
          <use href={`/img/sprite.svg#arrow-left`}></use>
        </svg>
      </Link>
    ),
  })

  return (
    <section className={'reviews'}>
      <div className={'reviews__inner'}>
        <div className={' my-catalog__block subject-card--gray'}>
          <div className="my-catalog__left">
            <h1 className={'my-catalog__left-title'}>{data?.title}</h1>
            <div
              className={'my-catalog__left-text'}
              dangerouslySetInnerHTML={{ __html: data?.description || '' }}
            />
            <div className="my-catalog__box">
              {data?.lectors?.map((lecturer, i) => (
                <TeacherForCourse
                  key={lecturer.id}
                  lecturer={lecturer}
                />
              ))}
            </div>
          </div>
          <div className={'my-catalog__ridth'}>
            <div className={'reviews__ratings '}>
              <Rating
                style={{ maxWidth: 100 }}
                value={data?.rating || 0}
                readOnly
              />
              {data?.rating && <p className={'reviews__ratings-text'}>{data.rating}</p>}
            </div>
            {data?.cover && (
              <div className={'my-catalog__ridth-photo'}>
                <Image
                  src={data.cover}
                  width={100}
                  height={100}
                  {...imgBlur}
                  alt={data.title}
                />
              </div>
            )}
          </div>
        </div>
        <div className={'reviews__top'}>
          <div className={'reviews__ratings reviews__ratings--degree'}>
            <Rating
              style={{ maxWidth: 100 }}
              value={data?.rating || 0}
              readOnly
            />
            <p className={'raviews__rating'}>{data?.rating || 0} з 5</p>
          </div>
          <p className={'reviews__top-text'}>Всього відгуків {data?.reviews.count}</p>
        </div>
        <div className={'reviews__block'}>
          {profile && allowAdd && (
            <ReviewAdd
              courseId={params.course_id as string}
              handleAdd={handleReviewAdd}
            />
          )}
          {reviewsList.map((review) => (
            <ReviewItem
              key={review.id}
              {...review}
            />
          ))}

          {/*TODO: add pagination*/}
          <div className={'reviews__paginations'}>
            <button className={'reviews__btn'}>
              <svg className="reviews__arrow-svg">
                <use href="/img/sprite.svg#arrow-left"></use>
              </svg>
            </button>
            <ul className={'courses-catalog__paginations-list'}>
              <li className={'courses-catalog__paginations-item courses-catalog__paginations--active'}>1</li>
              <li className={'courses-catalog__paginations-item'}>2</li>
              <li className={'courses-catalog__paginations-item'}>3</li>
              <li className={'courses-catalog__paginations-item'}>4</li>
              <li className={'courses-catalog__paginations-item'}>5</li>
              <li className={'courses-catalog__paginations-item'}>...</li>
              <li className={'courses-catalog__paginations-item'}>11</li>
            </ul>
            <button className={'reviews__btn'}>
              <svg className="reviews__arrow-svg reviews__arrow--active">
                <use href="/img/sprite.svg#arrow-ridth"></use>
              </svg>
            </button>
          </div>

          {/*TODO: add recommendation*/}
          <div className={'reviews__shop'}>
            <h2 className={'reviews__shop-title'}>Ми рекомендуємо, буде цікаво</h2>
            <Link
              href="/"
              className={'reviews__shop-link statistics-block__link link'}
            >
              Всі курсу
              <svg className="reviews__arrow-svg reviews__arrow--active">
                <use href="/img/sprite.svg#arrow-ridth"></use>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
