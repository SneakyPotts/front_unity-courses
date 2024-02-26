import React, { useContext } from 'react'
import Cookies from 'universal-cookie'
import { useLocalStorage } from 'usehooks-ts'

import { ErrorResponse } from '@assets/types/globals'
import { appContext } from '@components/Context/context'
import { addToBasketAction } from '@http/profile/actions'
import { TBasket, TBasketCourse } from '@http/profile/type'

import { Button } from '_ui/Button'
import { toastPromise } from '_ui/ToastUtils'

import type { AddToBasketButtonProps } from './AddToBasketButton.props'

export function AddToBasketButton({ callback, course }: AddToBasketButtonProps) {
  const { profile, basket, setBasket } = useContext(appContext)

  const [basketLocal, setBasketLocal] = useLocalStorage<TBasketCourse[] | null>('basket', null, { serializer: JSON.stringify, deserializer: JSON.parse })

  const handleAddToBasket = () => {
    if (!!profile) {
      toastPromise<{ data: TBasket; error: ErrorResponse }>({
        handler: addToBasketAction(course.id),
        successCallback: (res) => {
          const response = res?.data

          if (!response?.error && response?.data) {
            setBasket(response.data?.courses ?? [])
          }
          callback()
        },
        successMessage: 'Курс успішно додано в корзину',
      })
    } else {
      const cookies = new Cookies()

      const courseData: TBasketCourse = {
        id: course.id,
        cover: course.cover,
        title: course.title,
        description: course.description,
        price: course.price,
        discount: course.discount,
      }

      if (cookies.get('basket')) {
        const idArray = cookies.get('basket').split(',')

        cookies.set('basket', [...idArray, course.id].join(','))

        setBasketLocal([...(basketLocal || []), courseData])
        setBasket([...(basket || []), courseData])
      } else {
        cookies.set('basket', course.id)
        setBasketLocal([courseData])
        setBasket([courseData])
      }

      callback()
    }
  }

  return (
    <Button
      className={'some_button  reviews__content--btn'}
      onClick={handleAddToBasket}
    >
      <svg className="courses-catalog__icon courses-catalog__icon--element">
        <use href={`/img/sprite.svg#${!course.price ? 'cours' : 'basket-shopping'}`}></use>
      </svg>
      {!course.price ? 'Отримати' : 'Додати в кошик'}
    </Button>
  )
}
