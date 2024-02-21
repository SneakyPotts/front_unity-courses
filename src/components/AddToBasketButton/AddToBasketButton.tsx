import React, { useContext } from 'react'

import { ErrorResponse } from '@assets/types/globals'
import { appContext } from '@components/Context/context'
import { addToBasketAction } from '@http/profile/actions'
import { TBasket } from '@http/profile/type'

import { Button } from '_ui/Button'
import { toastPromise } from '_ui/ToastUtils'

import type { AddToBasketButtonProps } from './AddToBasketButton.props'

export function AddToBasketButton({ courseId, isFree, callback }: AddToBasketButtonProps) {
  const { setBasket } = useContext(appContext)

  const handleAddToBasket = () => {
    toastPromise<{ data: TBasket; error: ErrorResponse }>({
      handler: addToBasketAction(courseId),
      successCallback: (res) => {
        const response = res?.data

        if (!response?.error && response?.data) {
          setBasket(response.data?.courses ?? [])
        }
        callback()
      },
      successMessage: 'Курс успішно додано в корзину',
    })
  }

  return (
    <Button
      className={'some_button  reviews__content--btn'}
      onClick={handleAddToBasket}
    >
      <svg className="courses-catalog__svg courses-catalog__svg-rocket ">
        <use href={`/img/sprite.svg#${isFree ? 'cours' : 'basket-course'}`}></use>
      </svg>
      {isFree ? 'Отримати' : 'Додати в кошик'}
    </Button>
  )
}
