import React, { useContext, useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'

import Image from 'next/image'

import { courseCaption, formatDateInGenitive, formattedPrice, imgBlur } from '@assets/utils'
import { AddToBasketButton } from '@components/AddToBasketButton'
import { appContext } from '@components/Context/context'

import { Button } from '_ui/Button'

import type { SubjectHeaderProps } from './SubjectHeader.props'

export function SubjectHeader({ data }: SubjectHeaderProps) {
  const { basket } = useContext(appContext)

  const [inBasket, setInBasket] = useState(false)

  useEffect(() => {
    setInBasket(!!basket?.find((v) => v.id === data?.id))
  }, [basket])

  return (
    <div
      className="archive__head"
      style={{ backgroundColor: data?.color }}
    >
      <div className={'archive__item archive__item--text'}>
        <h1 className={'archive__title'}>{data?.title}</h1>
      </div>
      <div className={'archive__item archive__photo'}>
        {data?.categories_repr?.map((cat, i) => (
          <span
            key={`${cat}${i}`}
            className={'courses-catalog__tag'}
          >
            {cat}
          </span>
        ))}

        {data?.cover && (
          <div className={'archive__img'}>
            <Image
              src={data.cover}
              width={400}
              height={200}
              {...imgBlur}
              alt="фото курса"
            />
          </div>
        )}
      </div>
      <div className={'archive__item archive__item--element'}>
        <div className={'archive__data my-catalog__condition--violet'}>
          <svg className="archive__data-svg">
            <use href="/img/sprite.svg#clock"></use>
          </svg>
          <p>{data?.start_date ? `старт курсу - ${formatDateInGenitive(new Date(data.start_date))}` : 'курс дійсний 30 днів'}</p>
        </div>
        <div className={'archive__conditions'}>
          <svg className="nav__link-svg">
            <use href="/img/sprite.svg#camera"></use>
          </svg>
          <p className={'archive__conditions-text'}>{courseCaption[data?.format || 'self']}</p>
        </div>
        <div className={'archive__duration'}>
          <div className={'archive__duration-box'}>
            <svg className="nav__link-svg">
              <use href="/img/sprite.svg#calendar"></use>
            </svg>
            <p>1 місяць</p>
          </div>
          {!!data?.number_of_lectures && (
            <div className={'archive__duration-box'}>
              <svg className="nav__link-svg">
                <use href="/img/sprite.svg#material"></use>
              </svg>
              <p>{data.number_of_lectures} занять</p>
            </div>
          )}
          <div className={'archive__duration-box'}>
            <svg className="nav__link-svg">
              <use href="/img/sprite.svg#clock"></use>
            </svg>
            <p>10 годин</p>
          </div>
          <div className={'archive__duration-box'}>
            <svg className="nav__link-svg">
              <use href="/img/sprite.svg#star"></use>
            </svg>
            <p>{data?.rating}</p>
          </div>
        </div>
      </div>
      <div className={'archive__item archive__ridth'}>
        <div className={'archive__sign archive__item--element'}>
          <div className={'archive__places'}>
            <svg className="nav__link-svg">
              <use href="/img/sprite.svg#man"></use>
            </svg>
            <svg className="nav__link-svg">
              <use href="/img/sprite.svg#woman"></use>
            </svg>
            <p className="archive__places-text">
              {!!data?.max_number_of_students ? `залишилось мість: ${data?.max_number_of_students - (data?.number_of_students || 0)} з 18` : 'необмежено'}
            </p>
          </div>
          <button className={'teacher-card__question archive__btn--element'}>
            <svg className="teacher-card__question-svg">
              <use href="/img/sprite.svg#message"></use>
            </svg>
            Задати питання
          </button>
        </div>
        {basket === undefined ? (
          <div className={'archive__result archive__item--element --loading'}>
            <Skeleton height={33} />
          </div>
        ) : inBasket ? (
          <div className={'archive__result archive__item--element --in-basket'}>
            <Button
              variant="border"
              className={'some_button  reviews__content--btn'}
              disabled
            >
              <svg className="btn__icon">
                <use href={`/img/sprite.svg#check`}></use>
              </svg>
              В кошику
            </Button>
          </div>
        ) : (
          <div className={'archive__result archive__item--element'}>
            <div className="archive__price">
              {!!data?.discount && <s className={'archive__price-discount'}>{formattedPrice(data.price)} грн.</s>}
              <p className={'archive__price-text'}>{data?.price ? `${formattedPrice(data.discount || data.price)} грн.` : 'Безкоштовно'}</p>
            </div>

            <AddToBasketButton
              course={data!}
              callback={() => setInBasket(true)}
            />
          </div>
        )}
      </div>
    </div>
  )
}
