'use client'

import { type PropsWithChildren, useContext } from 'react'
import { Aside } from '@components/Aside'
import { appContext } from '@components/Context/context'
import classNames from 'classnames'

export default function BaseLayout({ children }: PropsWithChildren) {
  const { asideIsOpen } = useContext(appContext)

  return (
    <>
      <div className={'layout'}>
        <Aside />

        <main className={classNames('main inner-layout', { 'main--active': asideIsOpen })}>
          <header className={'header'}>
            <div className={'header__container container'}>
              <h1 className={'header__title'}>Каталог курсів</h1>
              <nav className={'header__nav'}>
                <ul className={'header__list'}>
                  <li className={'header__item'}>время</li>
                  <li className={'header__item'}>
                    <button className={'header__item-btn'}>
                      <svg className="">
                        <use href="/img/sprite.svg#basket-course"></use>
                      </svg>
                    </button>
                  </li>
                  <li className={'header__item'}>
                    <button className={'header__item-btn'}>
                      <svg className="">
                        <use href="/img/sprite.svg#like-courses"></use>
                      </svg>
                    </button>
                  </li>
                  <li className={'header__item'}>
                    <button className={'header__item-btn'}>
                      <svg className="">
                        <use href="/img/sprite.svg#notification-courses"></use>
                      </svg>
                    </button>
                  </li>
                  <li className={'header__item'}>профиль пользователя</li>
                </ul>
              </nav>
            </div>
          </header>

          {children}
        </main>
      </div>

      <footer>2</footer>
    </>
  )
}
