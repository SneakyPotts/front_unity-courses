import { format } from 'date-fns'
import React, { useContext, useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'

import Image from 'next/image'
import Link from 'next/link'

import { formattedPrice, imgBlur } from '@assets/utils'
import { AddToBasketButton } from '@components/AddToBasketButton'
import { appContext } from '@components/Context/context'

import { Button } from '_ui/Button'
import { TeacherForCourse } from '_ui/TeacherForCourse'

import type { CourseCatalogItemProps } from './CourseCatalogItem.props'

export function CourseCatalogItem({ ...props }: CourseCatalogItemProps) {
  const { basket } = useContext(appContext)

  const [inBasket, setInBasket] = useState(false)

  useEffect(() => {
    setInBasket(!!basket?.find((v) => v.id === props.id))
  }, [basket])

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
        <button className={'courses-catalog__like courses-catalog__like--chosen'}>
          <svg>
            <use href="/img/sprite.svg#course-catalog-like"></use>
          </svg>
        </button>
        <div className={'courses-catalog__photo'}>
          <Link href={`/courses/${props.id}`}>
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
          href={`/courses/${props.id}`}
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
      ) : (
        <div className={'courses-catalog__price'}>
          <div className={'courses-catalog__cost'}>
            {!!props.discount && (
              <s className={'courses-catalog__cost-discount'}>
                <span>{formattedPrice(props.price)} грн.</span>
              </s>
            )}
            <p>{!!props.price ? `${formattedPrice(props.discount || props.price)} грн.` : 'Безкоштовно'}</p>
          </div>
          <AddToBasketButton
            course={props}
            callback={() => setInBasket(true)}
          />
        </div>
      )}
    </div>
  )
}
