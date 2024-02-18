import React from 'react'

import Link from 'next/link'

import { CustomLink } from '_ui/CustomLink'

import type { RecommendedProps } from './Recommended.props'

export function Recommended({ ...props }: RecommendedProps) {
  return (
    <section className="recommended">
      <div className="recommended__inner">
        <div className="recommended__top">
          <h2 className="recommended__title">Ми рекомендуємо, буде цікаво</h2>
          <CustomLink
            href="#"
            className="recommended__link link"
          >
            Всі рекомендації
            <svg>
              <use href="/img/sprite.svg#arrow-right"></use>
            </svg>
          </CustomLink>
        </div>
        <div className="recommended__bottom">
          <ul className="recommended__list">
            <li className="recommended__card">
              <RecommendedCard />
            </li>
            <li className="recommended__card">
              <RecommendedCard />
            </li>
            <li className="recommended__card">
              <RecommendedCard />
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

function RecommendedCard() {
  return (
    <article className="recommended-card">
      <Link
        href="#"
        className="recommended-card__image"
      >
        <img
          src="https://picsum.photos/600/500?random=1"
          alt=""
        />
      </Link>
      <div className="recommended-card__info">
        <Link
          href="#"
          className="recommended-card__title"
        >
          Вступ до мови програмування Python
        </Link>
        <Link
          href="#"
          className="recommended-card__teacher teacher"
        >
          <div className="teacher__img">
            <img
              src="https://picsum.photos/200/300"
              alt=""
            />
          </div>
          Бондар Олег Михайлович
        </Link>
      </div>
    </article>
  )
}
