'use client'

import { useContext, useState } from 'react'

import Image from 'next/image'

import { appContext } from '@/components/Context/context'
import { useQueryCertificates } from '@http/profile/client.certificates'

import { PageWrapper } from '_ui/PageWrapper'

export default function ProfilePage() {
  const { profile } = useContext(appContext)

  const [page, setPage] = useState(1)

  const {
    list: { data, isLoading, isError },
  } = useQueryCertificates({ page })

  return (
    <PageWrapper>
      <div className="profile">
        <div className="profile__inner">
          <div className={'profile__head'}>{/* TODO тут будет картинка профиля */}</div>
          <div className={'profile__info'}>
            <h2 className={'profile__title'}>Профіль</h2>
            <div className={'profile__content'}>
              <ProfileForm />
              <ProfileForm />
            </div>
            <div className={'profile__contact'}>
              <div className="profile__links">
                <h2 className={'profile__links-title'}>Посилання</h2>
                <ul className={'profile__links-list'}>
                  <li >
                    <input
                      type="text"
                      className={'input'}
                      placeholder="Вкажіть посилання"
                    />
                  </li>
                  <li >
                    <input
                      type="text"
                      className={'input'}
                      placeholder="Введіть ім’я користувача Facebook "
                    />
                  </li>
                  <li>
                    <input
                      type="text"
                      className={'input'}
                      placeholder="Введіть ваш ID LinkedIn"
                    />
                  </li>
                  <li >
                    <input
                      type="text"
                      className={'input'}
                      placeholder="Введіть ім’я користувача Telegram"
                    />
                  </li>

                </ul>
              </div>
              <div className="profile__about">
                <h2 className={'profile__about-title'}>Напишіть коротко про себе</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}

function ProfileForm() {
  return (
    <form className={'profile__form'}>
      <ul className={'profile__list'}>
        <li className={'profile__item'}>
          {/* TODO при редактировании профиля вешать класс profile__wrapper--active */}
          <div className={'profile__wrapper '}>
            <span className={'profile__wrapper-info'}>Ім’я</span>
            <div className={'profile__wrapper-box'}></div>
            <span className={'profile__wrapper-value'}>Олександра</span>
          </div>
          <button className={'profile__wrapper-btn'}>
            <svg>
              <use href="/img/sprite.svg#pencil"></use>
            </svg>
          </button>
        </li>

        <li className={'profile__item'}>
          <div className={'profile__wrapper'}>
            <span className={'profile__wrapper-info'}>Дата народження</span>
            <div className={'profile__wrapper-box'}></div>
            <span className={'profile__wrapper-value'}>03.05.1990</span>
          </div>
          <button className={'profile__wrapper-btn'}>
            <svg>
              <use href="/img/sprite.svg#pencil"></use>
            </svg>
          </button>
        </li>
        <li className={'profile__item'}>
          <div className={'profile__wrapper'}>
            <span className={'profile__wrapper-info'}>03.05.1990</span>
            <div className={'profile__wrapper-box'}></div>
            <span className={'profile__wrapper-value'}>+38 (096) 12 12 321</span>
          </div>
          <button className={'profile__wrapper-btn'}>
            <svg>
              <use href="/img/sprite.svg#pencil"></use>
            </svg>
          </button>
        </li>
        <li className={'profile__item'}>
          <div className={'profile__wrapper'}>
            <span className={'profile__wrapper-info'}>Пошта</span>
            <div className={'profile__wrapper-box'}></div>
            <span className={'profile__wrapper-value'}>Ovcharenko_Union@gmail.com</span>
          </div>
          {/* <button className={'profile__wrapper-btn'}>
            <svg>
              <use href="/img/sprite.svg#pencil"></use>
            </svg>
          </button> */}
        </li>
      </ul>
    </form>
  )
}


