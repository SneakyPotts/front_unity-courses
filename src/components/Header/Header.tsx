'use client'

import classNames from 'classnames'
import React, { useContext, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useOnClickOutside } from 'usehooks-ts'

import Image from 'next/image'
import Link from 'next/link'

import { appContext } from '@components/Context/context'
import { AuthModal, BasketModal } from '@components/Modals'

import { Button } from '@UI/Button'
import { HeaderClock } from '@UI/HeaderClock'

import { SignOutAction } from '@http/profile/serverActions'

import type { HeaderProps, ProfilePopupProps } from './Header.props'

export function Header({ profile, className }: HeaderProps) {
  const { header } = useContext(appContext)

  const profileRef = useRef(null)

  const [isShowProfilePopup, setIsShowProfilePopup] = useState(false)
  const [isShowBasketPopup, setIsShowBasketPopup] = useState(false)
  const [isShowAuthModal, setIsShowAuthModal] = useState(false)

  const handleProfileClick = () => {
    profile ? setIsShowProfilePopup((p) => !p) : setIsShowAuthModal(true)
  }

  useOnClickOutside(profileRef, () => setIsShowProfilePopup(false))

  return (
    <header className={classNames('header', className)}>
      <div className="header__container container">
        {header ? (
          <h1 className="header__title">
            {header.title} {profile?.last_name}
          </h1>
        ) : (
          <Skeleton height={30} />
        )}

        <nav className="header__nav">
          <ul className="header__list">
            <li className="header__item header__item--clock">
              <HeaderClock />
            </li>
            <li className="header__item">
              <button
                className="header__item-btn"
                onClick={() => setIsShowBasketPopup(true)}
              >
                <svg className="header__item-svg header__item--basket">
                  <use href="/img/sprite.svg#basket-course"></use>
                </svg>
              </button>
              {isShowBasketPopup && <BasketModal onClose={() => setIsShowBasketPopup(false)} />}
            </li>
            <li className="header__item">
              <button className="header__item-btn">
                <svg className="header__item-svg">
                  <use href="/img/sprite.svg#like-courses"></use>
                </svg>
              </button>
            </li>
            <li className="header__item">
              <button className="header__item-btn">
                <svg className="header__item-svg">
                  <use href="/img/sprite.svg#notification-courses"></use>
                </svg>
              </button>
            </li>
            <li
              ref={profileRef}
              className="header__item"
            >
              <button
                className="header__account"
                onClick={handleProfileClick}
              >
                <Image
                  src="https://loremflickr.com/640/360"
                  fill
                  style={{ objectFit: 'cover' }}
                  alt="alt"
                />
              </button>

              {isShowProfilePopup && <ProfilePopup onClose={() => setIsShowProfilePopup(false)} />}
              {isShowAuthModal && <AuthModal onClose={() => setIsShowAuthModal(false)} />}
            </li>
          </ul>
          <div className="notification">
            <div className="notification__head">
              <p className={'notification__head-text'}>Кошик</p>
              <button className={'notification__head-close'}>
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
              <Button className={'some_button'}>оформити замовленя</Button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

function ProfilePopup({ onClose }: ProfilePopupProps) {
  const [lang, setLang] = useState('uk')

  const handleExit = () => {
    SignOutAction()
      .then(() => onClose())
      .catch(console.log)
  }

  return (
    <div className="header__submenu">
      <div className="header__head">
        <button className="header__head-close">
          <svg className="header__head-svg">
            <use href="/img/sprite.svg#arrow-right"></use>
          </svg>
        </button>
        <Image
          src="https://loremflickr.com/640/360"
          width={50}
          height={50}
          alt="alt"
          className="header__head-img"
          objectFit="cover"
        />
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
          <button
            className="header__block-link"
            onClick={handleExit}
          >
            <svg className="header__block-svg">
              <use href="/img/sprite.svg#logout"></use>
            </svg>
            Вийти
          </button>
        </li>
      </ul>
      <div className={'header__school'}>
        <button className={'header__school-menu'}>
          <svg className="header__school-svg">
            <use href="/img/sprite.svg#home"></use>
          </svg>
          школа
        </button>
      </div>
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
  )
}
