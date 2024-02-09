'use client'

import classNames from 'classnames'
import React, { useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

import Image from 'next/image'
import Link from 'next/link'

import { Portal } from '@components/Portal'

import { HeaderClock } from '@UI/HeaderClock'

import type { HeaderProps, ProfilePopupProps } from './Header.props'

export function Header({ className }: HeaderProps) {
  const [isShowProfilePopup, setIsShowProfilePopup] = useState(false)

  return (
    <header className={classNames('header', className)}>
      <div className="header__container container">
        <h1 className="header__title">Каталог курсів</h1>
        <nav className="header__nav">
          <ul className="header__list">
            <li className="header__item header__item--clock">
              <HeaderClock />
            </li>
            <li className="header__item">
              <button className="header__item-btn">
                <svg className="">
                  <use href="/img/sprite.svg#basket-course"></use>
                </svg>
              </button>
            </li>
            <li className="header__item">
              <button className="header__item-btn">
                <svg className="">
                  <use href="/img/sprite.svg#like-courses"></use>
                </svg>
              </button>
            </li>
            <li className="header__item">
              <button className="header__item-btn">
                <svg className="">
                  <use href="/img/sprite.svg#notification-courses"></use>
                </svg>
              </button>
            </li>
            <li className="header__item">
              <button
                className="header__account"
                onClick={() => setIsShowProfilePopup((p) => !p)}
              >
                <Image
                  src="https://loremflickr.com/640/360"
                  fill
                  style={{ objectFit: 'cover' }}
                  alt="alt"
                />
              </button>

              {isShowProfilePopup && <ProfilePopup onClose={() => setIsShowProfilePopup(false)} />}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

function ProfilePopup({ onClose }: ProfilePopupProps) {
  const popup = useRef(null)

  const [lang, setLang] = useState('uk')

  useOnClickOutside(popup, onClose)

  return (
    <Portal>
      <div
        ref={popup}
        className="header__submenu"
      >
        <div className="header__head">
          <button className="header__head-close">
            <svg className="header__head-svg">
              <use href="/img/sprite.svg#arrow-right"></use>
            </svg>
          </button>
          <div className="header__head-img">
            <Image
              src="https://loremflickr.com/640/360"
              width={50}
              height={50}
              alt="alt"
            />
          </div>
          <div className="header__submenu-name">
            <p>Лисенко Олександра</p>
          </div>
        </div>
        <ul className="header__block">
          <li className="header__block-item">
            <Link
              href="#"
              className="header__block-link"
            >
              <svg className="header__block-svg">
                <use href="/img/sprite.svg#account"></use>
              </svg>
              Особистий профіль
            </Link>
          </li>
          <li className="header__block-item">
            <a
              href="#"
              className="header__block-link"
            >
              <svg className="header__block-svg">
                <use href="/img/sprite.svg#logo"></use>
              </svg>
              Про Unity
            </a>
          </li>
          <li className="header__block-item">
            <button className="header__block-link">
              <svg className="header__block-svg">
                <use href="/img/sprite.svg#logout"></use>
              </svg>
              Вийти
            </button>
          </li>
        </ul>

        <div className="header__buttons">
          <button
            className={classNames('header__buttons-btn', { 'header__buttuns-btn--active': lang === 'uk' })}
            onClick={() => setLang('uk')}
          >
            Укр
          </button>
          <button
            className={classNames('header__buttons-btn', { 'header__buttuns-btn--active': lang === 'ru' })}
            onClick={() => setLang('ru')}
          >
            Рус
          </button>
        </div>
      </div>
    </Portal>
  )
}
