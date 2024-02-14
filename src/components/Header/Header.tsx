'use client'

import classNames from 'classnames'
import React, { ChangeEventHandler, useContext, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useOnClickOutside } from 'usehooks-ts'
import { z } from 'zod'

import Image from 'next/image'
import Link from 'next/link'

import { appContext } from '@components/Context/context'

import { Button } from '@UI/Button'
import { Checkbox } from '@UI/Checkbox'
import { Field } from '@UI/Field'
import { HeaderClock } from '@UI/HeaderClock'
import { Modal } from '@UI/Modal'
import { RequestError } from '@UI/RequestError'

import { zodResolver } from '@hookform/resolvers/zod'
import { SignInServerAction, SignOutAction } from '@http/profile/serverActions'

import type { AuthModalProps, HeaderProps, ProfilePopupProps } from './Header.props'
import { schema } from './SignIn.schema'

type FormSchema = z.infer<typeof schema>

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

function AuthModal({ onClose }: AuthModalProps) {
  const error = !!0

  const [saveMe, setSaveMe] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  })

  const handleSaveMe: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSaveMe(e.target.checked)
  }

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    SignInServerAction(data)
      .then(() => {
        onClose()
      })
      .catch(console.log)
  }

  return (
    <Modal
      variant="signInCourses"
      title={'Вхід'}
      onClose={onClose}
    >
      <form
        className="login__form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="login__form-img">
          <Image
            className="login__form-logo"
            src="/img/aside-logo.svg"
            fill
            alt="alt"
          />
        </div>
        <div className="login__form-inner">
          <Field
            {...register('email')}
            className={'modal__field'}
            type={'text'}
            placeholder={'Ваш email'}
            label={'Пошта'}
            inputMode="email"
            error={errors?.email?.message}
          />
          <Field
            {...register('password')}
            type={'password'}
            className={'modal__field'}
            placeholder={'Ваш пароль'}
            label={'Пароль'}
            error={errors?.password?.message}
          />
          <div className="login__form-bottom">
            <Checkbox
              label={'Запам’ятати мене'}
              onChange={handleSaveMe}
              checked={saveMe}
            />
            <Link
              href={'/auth/forgot-password'}
              className="login__form__bottom-text"
            >
              Забули пароль?
            </Link>
          </div>

          {error && <RequestError data={error} />}

          <div className="login__form-controls">
            <Button
              className="login__form-btn"
              type="submit"
            >
              <svg className="login__form-svg">
                <use href="/img/sprite.svg#login"></use>
              </svg>
              Увійти
            </Button>

            <span>Або</span>

            <Button
              className="login__form-btn"
              variant={'border'}
            >
              <svg className="login__form-svg">
                <use href="/img/sprite.svg#login"></use>
              </svg>
              google
            </Button>
          </div>

          <p className="login__signUp">
            Ще не зареєстровані? <Link href={'#'}>Створити аккаунт</Link>
          </p>
        </div>
      </form>
    </Modal>
  )
}

interface BasketModalProps {
  onClose: () => void
}

function BasketModal({ onClose }: BasketModalProps) {
  return (
    <Modal
      variant="empty" /*basket-model*/
      title="Кошик"
      onClose={onClose}
    >
      <div className={'basket-model__block'}>
        <div className="basket-model__courses">
          <ul className={'basket-model__list'}>
            <li className={'basket-model__list-img'}>
              <Image
                src="https://loremflickr.com/100/100"
                style={{ objectFit: 'cover', borderRadius: '5px' }}
                alt="alt"
                width={100}
                height={100}
              />
            </li>
            <li className={'basket-model__list-text'}>
              Вступ до мови програмування Python початковий рівень для студентів з практичним застосуванням в реальних проєктах та інтерактивними завданнями
            </li>
            <li className={'basket-model__list-price'}>
              <s>6 800 грн.</s>
              <p>5 300 грн.</p>
            </li>
            <li className={'basket-model__list-basket'}>
              <button className={'basket-model__list-delete'}>
                <svg>
                  <use href="/img/sprite.svg#basket"></use>
                </svg>
              </button>
            </li>
          </ul>
          <ul className={'basket-model__list'}>
            <li className={'basket-model__list-img'}>
              <Image
                src="https://loremflickr.com/100/100"
                style={{ objectFit: 'cover', borderRadius: '5px' }}
                alt="alt"
                width={100}
                height={100}
              />
            </li>
            <li className={'basket-model__list-text'}>
              Вступ до мови програмування Python початковий рівень для студентів з практичним застосуванням в реальних проєктах та інтерактивними завданнями
            </li>
            <li className={'basket-model__list-price'}>
              <s>6 800 грн.</s>
              <p>5 300 грн.</p>
            </li>
            <li className={'basket-model__list-basket'}>
              <button className={'basket-model__list-delete'}>
                <svg>
                  <use href="/img/sprite.svg#basket"></use>
                </svg>
              </button>
            </li>
          </ul>
          <ul className={'basket-model__list'}>
            <li className={'basket-model__list-img'}>
              <Image
                src="https://loremflickr.com/100/100"
                style={{ objectFit: 'cover', borderRadius: '5px' }}
                alt="alt"
                width={100}
                height={100}
              />
            </li>
            <li className={'basket-model__list-text'}>
              Вступ до мови програмування Python початковий рівень для студентів з практичним застосуванням в реальних проєктах та інтерактивними завданнями
            </li>
            <li className={'basket-model__list-price'}>
              <s>6 800 грн.</s>
              <p>5 300 грн.</p>
            </li>
            <li className={'basket-model__list-basket'}>
              <button className={'basket-model__list-delete'}>
                <svg>
                  <use href="/img/sprite.svg#basket"></use>
                </svg>
              </button>
            </li>
          </ul>
        </div>
        <div className="basket-model__card">
          <div className="basket-model__card-title">Придбати курс (и)</div>
          <ul className={'basket-model__card-conditions'}>
            <li>Ви будете додані до безкоштовного курсу (курсів)</li>
            <li>Батькам буде відправлено запрос на покупку курсу (курсів).</li>
          </ul>
          <ul className={'basket-model__card-quantity'}>
            <li>
              <span>x1</span> <p>до мови програмування Python початковий рівень для студентів з практичним застосуванням в реальних проєктах та інтерактивними завданнями</p>
              <div className="basket-model__card-price">5 300 ₴</div>
            </li>
            <li>
              <span>x1</span>
              <p>Medium рівень програмування на JavaScript: розширення навичок з веб-розробки та створення динамічних інтерактивних веб-сайтів</p>
              <div className="basket-model__card-price">5 300 ₴</div>
            </li>
            <li>
              <span>x1</span>
              <p>Образотворче мистецтво для 10-11 класів веб-сайтів</p>
              <div className="basket-model__card-price">Безкоштовно</div>
            </li>
          </ul>

          <div className="basket-model__buttons">
            <Button
              className={'some_button basket-model__buttons-btn'}
              variant={'border'}
            >
             відхилити
            </Button >
            <Button className={'basket-model__buttons-btn'}>підтвердити</Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
