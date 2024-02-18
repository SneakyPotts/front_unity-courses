'use client'

import classNames from 'classnames'
import React, { useContext, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useOnClickOutside } from 'usehooks-ts'

import dynamic from 'next/dynamic'
import Image from 'next/image'

import { imgBlur } from '@assets/utils'
import { appContext } from '@components/Context/context'

import type { HeaderProps } from './Header.props'

const HeaderClock = dynamic(() => import('_ui/HeaderClock').then((m) => m.HeaderClock))

const AuthModal = dynamic(() => import('_modals/AuthModal').then((m) => m.AuthModal))
const ProfilePopup = dynamic(() => import('_popups/ProfilePopup').then((m) => m.ProfilePopup))
const ProfileInfoModal = dynamic(() => import('_modals/ProfileInfoModal').then((m) => m.ProfileInfoModal))

const BasketModal = dynamic(() => import('_modals/BasketModal').then((m) => m.BasketModal))
const BasketPopup = dynamic(() => import('_popups/BasketPopup').then((m) => m.BasketPopup))

export function Header({ profile, className }: HeaderProps) {
  const { header } = useContext(appContext)

  const role = {
    teacher: profile?.role === 20,
    student: profile?.role === 2,
    parent: profile?.role === 10,
  }

  const profileRef = useRef(null)
  const basketRef = useRef(null)

  const [isShowAuthModal, setIsShowAuthModal] = useState(false)
  const [isShowProfilePopup, setIsShowProfilePopup] = useState(false)
  const [isShowProfileModal, setIsShowProfileModal] = useState(false)

  const [isShowBasketPopup, setIsShowBasketPopup] = useState(false)
  const [isShowBasketModal, setIsShowBasketModal] = useState(false)

  const handleShowCheckout = () => {
    setIsShowBasketPopup(false)
    setIsShowBasketModal(true)
  }

  const handleShowProfile = () => {
    setIsShowProfilePopup(false)
    setIsShowProfileModal(true)
  }

  const handleProfileClick = () => {
    profile ? setIsShowProfilePopup((p) => !p) : setIsShowAuthModal(true)
  }

  useOnClickOutside(profileRef, () => setIsShowProfilePopup(false))
  useOnClickOutside(basketRef, () => setIsShowBasketPopup(false))

  return (
    <header className={classNames('header', className)}>
      <div className="header__container container">
        {header ? <h1 className="header__title">{header.title}</h1> : <Skeleton height={30} />}

        <nav className="header__nav">
          <ul className="header__list">
            <li className="header__item header__item--clock">
              <HeaderClock />
            </li>
            <li
              ref={basketRef}
              className="header__item"
            >
              <button
                className="header__item-btn"
                onClick={() => setIsShowBasketPopup(true)}
              >
                <svg className="header__item-svg header__item--basket">
                  <use href="/img/sprite.svg#basket-course"></use>
                </svg>
              </button>
              {isShowBasketPopup && (
                <BasketPopup
                  onClose={() => setIsShowBasketPopup(false)}
                  showCheckoutModal={handleShowCheckout}
                />
              )}
              {isShowBasketModal && <BasketModal onClose={() => setIsShowBasketModal(false)} />}
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
                  src={profile?.avatar || '/img/static/default-avatar.png'}
                  fill
                  style={{ objectFit: 'cover' }}
                  {...imgBlur}
                  alt="alt"
                />
              </button>

              {isShowAuthModal && <AuthModal onClose={() => setIsShowAuthModal(false)} />}
              {isShowProfilePopup && (
                <ProfilePopup
                  profile={profile}
                  showProfileModal={handleShowProfile}
                  onClose={() => setIsShowProfilePopup(false)}
                />
              )}
              {isShowProfileModal && (
                <ProfileInfoModal
                  teacherId={role.teacher ? profile?.id : undefined}
                  studentId={role.student ? profile?.id : undefined}
                  onClose={() => setIsShowProfileModal(false)}
                />
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
