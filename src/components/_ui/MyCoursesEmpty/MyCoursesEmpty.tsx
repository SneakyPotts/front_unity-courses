import React from 'react'

import { Button } from '_ui/Button'

import type { MyCoursesEmptyProps } from './MyCoursesEmpty.props'

export function MyCoursesEmpty({}: MyCoursesEmptyProps) {
  return (
    <div className={'offer'}>
      <div className={'offer__inner'}>
        <div className={'offer__title'}>
          Ще не знаєте, з якого курсу почати?
          <svg>
            <use href="/img/sprite.svg#course-magnifying"></use>
          </svg>
        </div>
        <ul className={'offer__list'}>
          <li className={'offer__item'}>
            <span className={'offer__item-mark'}>
              <svg>
                <use href="/img/sprite.svg#check-mark"></use>
              </svg>
            </span>
            Зверніть увагу на наші рекомендації або скористайтеся пошуком, щоб знайти те, що вам дійсно цікаво.
          </li>
          <li className={'offer__item'}>
            <span className={'offer__item-mark'}>
              <svg>
                <use href="/img/sprite.svg#check-mark"></use>
              </svg>
            </span>
            Ваша освіта - це не лише процес, це ваш особистий розвиток. Разом з нами ви зможете знайти той курс, який робить вашу освіту неповторною.
          </li>
        </ul>
        <div className={'offer__button'}>
          <Button className={'offer__btn'}>
            <svg>
              <use href="/img/sprite.svg#cours"></use>
            </svg>
            каталог курсів
          </Button>
        </div>

        <div className={'offer__decor'}>
          <svg>
            <use href="/img/sprite.svg#offer-like"></use>
          </svg>
        </div>
      </div>
    </div>
  )
}
