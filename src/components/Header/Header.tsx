'use client'

import classNames from 'classnames'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import Skeleton from 'react-loading-skeleton'
import { useOnClickOutside } from 'usehooks-ts'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { imgBlur } from '@assets/utils'
import { appContext } from '@components/Context/context'
import { useNotifications } from '@http/common/notifications.client'

import { Loader } from '_ui/Loader'
import { NotificationItem } from '_ui/NotificationItem'

import { AuthModal } from '_modals/AuthModal'
import { RegisterModal } from '_modals/RegisterModal'

import type { HeaderProps } from './Header.props'

const HeaderClock = dynamic(() => import('_ui/HeaderClock').then((m) => m.HeaderClock))

const ProfilePopup = dynamic(() => import('_popups/ProfilePopup').then((m) => m.ProfilePopup))

const BasketPopup = dynamic(() => import('_popups/BasketPopup').then((m) => m.BasketPopup))
const BasketModal = dynamic(() => import('_modals/BasketModal').then((m) => m.BasketModal))
const ChildBoughtModal = dynamic(() => import('_modals/ChildBoughtModal').then((m) => m.ChildBoughtModal))

export function Header({ profile, className }: HeaderProps) {
  const { header, basket, wish } = useContext(appContext)

  const role = {
    teacher: profile?.role === 20,
    student: profile?.role === 2,
    parent: profile?.role === 10,
  }

  const router = useRouter()

  const profileRef = useRef(null)
  const basketRef = useRef(null)

  const [isShowAuthModal, setIsShowAuthModal] = useState(false)
  const [isShowRegisterModal, setIsShowRegisterModal] = useState(false)

  const [isShowProfilePopup, setIsShowProfilePopup] = useState(false)

  const [isShowBasketPopup, setIsShowBasketPopup] = useState(false)
  const [isShowBasketModal, setIsShowBasketModal] = useState(false)
  const [isShowChildBought, setIsShowChildBought] = useState(false)

  const handleShowCheckout = () => {
    setIsShowBasketPopup(false)
    setIsShowBasketModal(true)
  }

  const handleChildBought = () => {
    setIsShowBasketModal(false)
    setIsShowChildBought(true)
  }

  const handleProfileClick = () => {
    profile ? setIsShowProfilePopup((p) => !p) : setIsShowAuthModal(true)
  }

  const handleShowAuthModal = () => {
    setIsShowAuthModal(true)
    setIsShowRegisterModal(false)
  }

  const handleShowRegisterModal = () => {
    setIsShowAuthModal(false)
    setIsShowRegisterModal(true)
  }

  const handleShowRegisterBasketModal = () => {
    setIsShowBasketModal(false)
    setIsShowRegisterModal(true)
  }

  useOnClickOutside(profileRef, () => setIsShowProfilePopup(false))
  useOnClickOutside(basketRef, () => setIsShowBasketPopup(false))

  return (
    <header className={classNames('header', className)}>
      <div className={classNames('header__container container', header?.headerClassName)}>
        {header ? (
          <div className="header__lesson">
            {header.titleBefore}
            <h1 className="header__title">{header.title}</h1>
            {header.titleAfter}
          </div>
        ) : (
          <Skeleton height={30} />
        )}

        <nav className="header__nav">
          <ul className="header__list">
            {header?.rightElement && <li className="header__item">{header.rightElement}</li>}
            <li className="header__item header__item--clock">
              <HeaderClock />
            </li>
            {!role.teacher && (
              <>
                <li
                  ref={basketRef}
                  className="header__item"
                >
                  <button
                    className={classNames({ 'header__item-btn': !!basket?.length })}
                    onClick={() => !!basket?.length && setIsShowBasketPopup(true)}
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
                  {isShowBasketModal && (
                    <BasketModal
                      onClose={() => setIsShowBasketModal(false)}
                      showChildBoughtModal={handleChildBought}
                      showRegisterBasket={handleShowRegisterBasketModal}
                    />
                  )}
                  {isShowChildBought && <ChildBoughtModal onClose={() => setIsShowChildBought(false)} />}
                </li>
                <li className="header__item">
                  <Link
                    href={'/wishlist'}
                    className={classNames({ 'header__item-btn': !!wish?.length })}
                  >
                    <svg className="header__item-svg">
                      <use href="/img/sprite.svg#like-courses"></use>
                    </svg>
                  </Link>
                </li>
              </>
            )}

            <Notifications />

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
                  sizes="100vw"
                  style={{ objectFit: 'cover' }}
                  {...imgBlur}
                  alt="alt"
                />
              </button>

              {isShowAuthModal && (
                <AuthModal
                  onClose={() => setIsShowAuthModal(false)}
                  showRegister={handleShowRegisterModal}
                />
              )}
              {isShowRegisterModal && (
                <RegisterModal
                  onClose={() => setIsShowRegisterModal(false)}
                  showAuth={handleShowAuthModal}
                />
              )}
              {isShowProfilePopup && (
                <ProfilePopup
                  profile={profile}
                  showProfileModal={() => router.push('/profile')}
                  onClose={() => setIsShowProfilePopup(false)}
                />
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

function Notifications() {
  const wrapper = useRef(null)

  const page_size = 5
  const [page, setPage] = useState(1)
  const [isShow, setIsShow] = useState(false)

  const {
    notifications: { data, isLoading, isError, isPending },
    hasUnread: { data: hasUnread },
    readAll: { mutateAsync: readAll },
  } = useNotifications({ page_size: page_size * page })

  const { ref } = useInView({
    onChange: (inView) => {
      if (inView) {
        setPage((p) => p + 1)
      }
    },
    threshold: 1.0,
    skip: !data || page_size * page >= data.count,
  })

  useEffect(() => {
    if (isShow && hasUnread && !!data) {
      readAll().then().catch(console.error)
    }
  }, [data, hasUnread, isShow])

  useOnClickOutside(wrapper, () => setIsShow(false))

  return (
    <li
      ref={wrapper}
      className="header__item"
      style={{ position: 'relative' }}
    >
      <button
        className={classNames({ 'header__item-btn': hasUnread })}
        onClick={() => setIsShow((p) => !p)}
      >
        <svg className="header__item-svg">
          <use href="/img/sprite.svg#notification-courses"></use>
        </svg>
      </button>
      {isShow && (
        <div className="header__wrapper header__wrapper--active">
          <div className="notifications header__ntf">
            <div className="notifications__top">
              <button
                className="notifications__close"
                onClick={() => setIsShow(false)}
                id="notifications-close"
              >
                <svg className="notifications__close-svg">
                  <use href="/img/sprite.svg#arrow-right"></use>
                </svg>
              </button>
              <span className="notifications__top-name">Сповіщення</span>
            </div>
            <div className="notifications__inner">
              <div className="notifications__block">
                {isLoading && <Loader />}
                {isError && <p className="text-center">Щось пішло не так...</p>}
                {data?.results.length ? (
                  <ul className="notifications__list">
                    {/*<li className="notifications__item notifications__item--orange">*/}
                    {/*  <svg className="notifications__item-icon">*/}
                    {/*    <use href="/img/sprite.svg#cours"></use>*/}
                    {/*  </svg>*/}
                    {/*  <div className="notifications__item-text">*/}
                    {/*    <span>ДLorem ipsum dolor sit amet consectetur adipisicing elit. Est iusto nihil dolore non ab minima vero eius suscipit eos laborum.</span>*/}
                    {/*  </div>*/}
                    {/*  <time className="notifications__item-time">15.04.23 — 10:52</time>*/}
                    {/*</li>*/}
                    {data.results.map((v) => (
                      <NotificationItem
                        key={v.id}
                        {...v}
                      />
                    ))}
                    {isPending ? (
                      <Loader />
                    ) : (
                      <li
                        ref={ref}
                        style={{ width: '100%', height: 1 }}
                      />
                    )}
                  </ul>
                ) : (
                  <p className="text-center">Список пустий...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </li>
  )
}
