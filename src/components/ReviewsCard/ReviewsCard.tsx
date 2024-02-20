import React from 'react'

import Image from 'next/image'

import type { ReviewsCardProps } from './ReviewsCard.props'

export function ReviewsCard({}: ReviewsCardProps) {
  return (
    <div className={'archive__review'}>
      <div className={'archive__review-top'}>
        <div className={'archive__review-user'}>
          <div className={'reviews__person'}>
            <div className={'archive__review-photo'}>
              <Image
                src="https://loremflickr.com/640/360"
                width={40}
                height={40}
                alt="фото профиля"
              />
            </div>
          </div>
          <p>Биков Руслан</p>
        </div>
        <div className={'archive__review-assessment'}>
          <svg className="archive__reviews-svg">
            <use href="/img/sprite.svg#star"></use>
          </svg>
          <p>4.5</p>
        </div>
      </div>
      <p className={'archive__review-text'}>
        Цей курс змінив мій погляд на мистецтво. Вчитель створив таке захоплююче навчальне середовище, де ми не лише вивчаємо техніку, але і розкриваємо свій в
      </p>
      <a
        href="#"
        className={'archive__review-link'}
      >
        Відгук повністю
      </a>
    </div>
  )
}
