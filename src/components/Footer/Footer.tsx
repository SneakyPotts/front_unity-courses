import classNames from 'classnames'
import React from 'react'

import type { FooterProps } from './Footer.props'

export function Footer({ className }: FooterProps) {
  return (
    <footer className={classNames('footer', className)}>
      <div className="footer__container container">
        <ul className={'footer__list'}>
          <li>
            <a
              href="#"
              className={'footer__list-link'}
            >
              <svg className={'footer__link-svg footer__link--svg'}>
                <use href="/img/sprite.svg#logo"></use>
              </svg>
              Про Unity
            </a>
          </li>
          <li>
            <a
              href="#"
              className={'footer__list-link'}
            >
              <svg className={'footer__link-svg'}>
                <use href="/img/sprite.svg#ask"></use>
              </svg>
              Питання-відповіді
            </a>
          </li>
          <li>
            <a
              href="#"
              className={'footer__list-link'}
            >
              <svg className={'footer__link-svg'}>
                <use href="/img/sprite.svg#messanger"></use>
              </svg>
              Написати в месенджер
            </a>
          </li>
          <li className={'footer__list--last'}>
            <a
              href="#"
              className={'footer__list-link'}
            >
              <svg className={'footer__link-svg'}>
                <use href="/img/sprite.svg#tel-courses"></use>
              </svg>
              +38 068 255 25 22
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
