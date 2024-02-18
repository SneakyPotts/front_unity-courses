import React from 'react'

import Image from 'next/image'

import { Button } from '_ui/Button'

import type { BasketPopupProps } from './BasketPopup.props'

export function BasketPopup({ showCheckoutModal, onClose }: BasketPopupProps) {
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
        <ul className={'notification__list'}>
          <li className={'notification__list-img'}>
            <Image
              src="https://loremflickr.com/60/60"
              style={{ objectFit: 'cover' }}
              alt="alt"
              width={60}
              height={60}
            />
          </li>
          <li className={'notification__list-name'}>Medium рівень програмування на JavaScript Medium рівень програмування на JavaScript</li>
          <li className={'notification__list-price'}>
            <div className="notification__list-sale">5 300 грн.</div>
          </li>
        </ul>
        <ul className={'notification__list'}>
          <li className={'notification__list-img'}>
            <Image
              src="https://loremflickr.com/60/60"
              style={{ objectFit: 'cover' }}
              alt="alt"
              width={60}
              height={60}
            />
          </li>
          <li className={'notification__list-name'}>Medium рівень програмування на JavaScript Medium рівень програмування на JavaScript</li>
          <li className={'notification__list-price'}>
            <div className="notification__list-sale">
              <s>6 800 грн.</s>5 300 грн.
            </div>
          </li>
        </ul>
      </div>
      <div className={'notification__result'}>
        <div className={'notification__result-text'}>
          <p>Всього:</p>
          10 600 грн.
        </div>
        <Button
          className={'some_button'}
          onClick={showCheckoutModal}
        >
          оформити замовленя
        </Button>
      </div>
    </div>
  )
}
