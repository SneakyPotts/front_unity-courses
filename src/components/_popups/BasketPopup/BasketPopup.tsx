import React, { useContext } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { formattedPrice, imgBlur } from '@assets/utils'
import { appContext } from '@components/Context/context'

import { Button } from '_ui/Button'

import type { BasketPopupProps } from './BasketPopup.props'

export function BasketPopup({ showCheckoutModal, onClose }: BasketPopupProps) {
  const { basket } = useContext(appContext)

  const totalPrice = basket?.reduce((acc, item) => acc + (item.discount || item.price) * item.users?.length, 0)

  return (
    <div className="notification">
      <div className="notification__head">
        <p className={'notification__head-text'}>Кошик</p>
        <button
          className={'notification__head-close'}
          onClick={onClose}
        >
          <svg>
            <use href="/img/sprite.svg#close"></use>
          </svg>
        </button>
      </div>
      <div className={'notification__content'}>
        {basket?.map((v) => (
          <div
            key={v.id}
            className={'notification__list'}
          >
            <Link
              href={`/courses/${v.id}`}
              className={'notification__list-img'}
            >
              <Image
                src={v.cover || '/img/static/default-avatar.png'}
                width={60}
                height={60}
                style={{ objectFit: 'cover' }}
                {...imgBlur}
                alt="alt"
              />
            </Link>
            <div
              className={'notification__list-name'}
              dangerouslySetInnerHTML={{ __html: v.description }}
            />
            <div className={'notification__list-price'}>
              <div className="notification__list-sale">
                {!!v.discount && <s>{formattedPrice(v.price)} грн.</s>}
                {formattedPrice(v.discount || v.price)} грн.
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={'notification__result'}>
        <div className={'notification__result-text'}>
          <p>Всього:</p>
          {formattedPrice(totalPrice ?? 0)} грн.
        </div>
        <Button
          className={'some_button'}
          onClick={showCheckoutModal}
        >
          оформити замовлення
        </Button>
      </div>
    </div>
  )
}
