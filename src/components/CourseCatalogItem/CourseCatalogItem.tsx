import { format, isPast, parseISO } from 'date-fns'
import React, { useContext, useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'

import Image from 'next/image'
import Link from 'next/link'

import { formattedPrice, imgBlur } from '@assets/utils'
import { AddToBasketButton } from '@components/AddToBasketButton'
import { appContext } from '@components/Context/context'
import { addToWishlist, removeFromWishlist } from '@http/student/actions'

import { Button } from '_ui/Button'
import { TeacherForCourse } from '_ui/TeacherForCourse'

import type { CourseCatalogItemProps } from './CourseCatalogItem.props'

export function CourseCatalogItem({ isCertified, ...props }: CourseCatalogItemProps) {
  const { basket, wish } = useContext(appContext)

  const [inBasket, setInBasket] = useState(false)
  const [inWish, setInWish] = useState(false)

  const unavailable = !!props.end_date && isPast(parseISO(props.end_date))

  useEffect(() => {
    setInBasket(!!basket?.find((v) => v.id === props.id))
    setInWish(!!wish?.find((v) => v === props.id))
  }, [basket, props.id, wish])

  const PriceBlock = () => (
    <div className={'courses-catalog__price'}>
      <div className={'courses-catalog__cost'}>
        {!!props.discount && (
          <s className={'courses-catalog__cost-discount'}>
            <span>{formattedPrice(props.price)} грн.</span>
          </s>
        )}
        <p>{!!props.price ? `${formattedPrice(props.discount || props.price)} грн.` : 'Безкоштовно'}</p>
      </div>
      {!isCertified ? (
        <AddToBasketButton
          course={props}
          callback={() => setInBasket(true)}
        />
      ) : (
        <Button href={unavailable ? '/' : `/courses/${props.id}`}>
          перейти до курсу
          <svg className="btn__icon">
            <use href="/img/sprite.svg#arrow-right"></use>
          </svg>
        </Button>
      )}
    </div>
  )

  return (
    <div className={'courses-catalog__element'}>
      <div className="courses-catalog__box">
        {!!props.categories_repr.length && (
          <ul className={'courses-catalog__tag'}>
            {props.categories_repr.map((category, i) => (
              <li key={`${i}${category}`}>{category}</li>
            ))}
          </ul>
        )}
        <span className={'courses-catalog__lesson courses-catalog__review--decor'}>
          <svg className="courses-catalog__svg">
            <use href="/img/sprite.svg#material"></use>
          </svg>
          {props.number_of_lectures} занять
        </span>
        <span className={'courses-catalog__review courses-catalog__review--decor '}>
          <svg className={'courses-catalog__svg'}>
            <use href="/img/sprite.svg#star"></use>
          </svg>
          {props.rating}
        </span>
        {!(inBasket || props.purchased) && (
          <button
            className={'courses-catalog__like'}
            onClick={() => (inWish ? removeFromWishlist : addToWishlist)(props.id)}
          >
            <svg>
              <use href={`/img/sprite.svg#${inWish ? 'course-catalog-like-fill' : 'course-catalog-like'}`}></use>
            </svg>
          </button>
        )}
        <div className={'courses-catalog__photo'}>
          <Link href={unavailable ? '/' : `/courses/${props.id}`}>
            <Image
              src={props.cover}
              width={640}
              height={360}
              style={{ objectFit: 'cover' }}
              alt={props.title}
              {...imgBlur}
            />
          </Link>
        </div>
      </div>
      <div
        className={'courses-catalog__info'}
        style={{ backgroundColor: props.color }}
      >
        <Link
          className={'courses-catalog__info-title'}
          href={unavailable ? '/' : `/courses/${props.id}`}
        >
          {props.title}
        </Link>
        <div className={'courses-catalog__teachers'}>
          {props.lectors.map((lecturer) => (
            <TeacherForCourse
              key={lecturer.id}
              lecturer={lecturer}
            />
          ))}
        </div>
        <div className={'courses-catalog__conditions'}>
          <div className={'courses-catalog__data'}>
            <svg className={'nav__link-svg'}>
              <use href="/img/sprite.svg#clock"></use>{' '}
            </svg>
            <p>
              старт - <span>{format(new Date(props.start_date), 'dd.MM.yyyy')}</span>
            </p>
          </div>
          <div className={'courses-catalog__persons'}>
            <svg className={'courses-catalog__svg courses-catalog__svg-stroke'}>
              <use href="/img/sprite.svg#person"></use>{' '}
            </svg>
            {!!props.max_number_of_students ? (
              <p>
                вільних:{' '}
                <span>
                  {props.max_number_of_students - props.number_of_students} з {props.max_number_of_students}
                </span>
              </p>
            ) : (
              <p>необмежено</p>
            )}
          </div>
        </div>
      </div>
      {basket === undefined ? (
        <div className="courses-catalog__price --loading">
          <Skeleton
            height={33}
            width="100%"
          />
        </div>
      ) : inBasket || props.purchased ? (
        isCertified ? (
          <PriceBlock />
        ) : (
          <div className="courses-catalog__price --in-basket">
            <Button
              variant="border"
              className={'some_button courses-catalog__btn'}
              disabled
            >
              <svg className="btn__icon">
                <use href={`/img/sprite.svg#check`}></use>
              </svg>
              {inBasket ? 'В кошику' : 'Придбано'}
            </Button>
          </div>
        )
      ) : (
        <PriceBlock />
      )}
    </div>
  )
}
