import classNames from 'classnames'
import React, { useState } from 'react'
import { useWindowSize } from 'usehooks-ts'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { ChildrenSelectList } from '@components/ChildrenSelectList'
import { signOutAction } from '@http/profile/actions'
import { useQueryClient } from '@tanstack/react-query'

import type { ProfilePopupProps } from './ProfilePopup.props'

export function ProfilePopup({ onClose, showProfileModal, profile }: ProfilePopupProps) {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { width } = useWindowSize()

  const [lang, setLang] = useState('uk')

  const handleExit = () => {
    queryClient.clear() // clear client cache

    signOutAction()
      .then(() => {
        onClose()
        router.push('/')
      })
      .catch(console.log)
  }

  return (
    <div className="header__submenu">
      <div className="header__head">
        <button
          className="header__head-close"
          onClick={onClose}
        >
          <svg className="header__head-svg">
            <use href="/img/sprite.svg#arrow-right"></use>
          </svg>
        </button>
        <Image
          src={profile?.avatar || '/img/static/default-avatar.png'}
          width={50}
          height={50}
          alt={`${profile?.last_name} ${profile?.first_name}`}
          className="header__head-img"
          style={{ objectFit: 'cover' }}
        />
        <div className="header__submenu-name">
          <p>{`${profile?.last_name} ${profile?.first_name}`}</p>
        </div>
      </div>

      {profile && profile.role === 10 && width < 992 && <ChildrenSelectList mobile />}

      <ul className="header__block">
        <li className="header__block-item">
          <Link
            href={'/profile'}
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
