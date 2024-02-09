'use client'

import { type PropsWithChildren, useContext, useState, useEffect } from 'react'
import { Aside } from '@components/Aside'
import { appContext } from '@components/Context/context'
import classNames from 'classnames'
import Image from 'next/image'
import moment from 'moment'
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
                  <li className={'header__item'}>
                    <Clock />
                  </li>
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
                  <li className={'header__item'}>
                    <button className={'header__account'}>
                      <Image
                        src=""
                        width={34}
                        height={34}
                        objectFit="cover"
                      />
                    </button>
                    <div className={'header__submenu'}>
                      <p className={'header__submenu-name'}>Лисенко Олександра</p>
                      <ul className={'header__block'}>
                        <li className={'header__block-item'}>
                          <a
                            href="#"
                            className={'header__block-link'}
                          >
                            <svg className="header__block-svg">
                              <use href="/img/sprite.svg#account"></use>
                            </svg>
                            Особистий профіль
                          </a>
                        </li>
                        <li className={'header__block-item'}>
                          <a
                            href="#"
                            className={'header__block-link'}
                          >
                            <svg className="header__block-svg">
                              <use href="/img/sprite.svg#logo"></use>
                            </svg>
                            Про Unity
                          </a>
                        </li>
                        <li className={'header__block-item'}>
                          <a
                            href="#"
                            className={'header__block-link'}
                          >
                            <svg className="header__block-svg">
                              <use href="/img/sprite.svg#logout"></use>
                            </svg>
                            Вийти
                          </a>
                        </li>
                      </ul>
                      <div className="header__buttons">
                        <button className={'header__buttons-btn header--active'}>Укр</button>
                        <button className={'header__buttons-btn'}>Рус</button>
                      </div>
                    </div>
                  </li>
                </ul>
              </nav>
            </div>
          </header>

          {children}
          <footer className="footer">
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
        </main>
      </div>
    </>
  )
}

function Clock() {
  const [time, setTime] = useState({
    hours: moment().format('HH'),
    minutes: moment().format('mm'),
    seconds: moment().format('ss'),
  })

  useEffect(() => {
    const timerID = setInterval(() => {
      setTime({
        hours: moment().format('HH'),
        minutes: moment().format('mm'),
        seconds: moment().format('ss'),
      })
    }, 1000)
    return () => clearInterval(timerID)
  }, [])

  return (
    <div className="header__time">
      <span className="header__hours">{time.hours}</span>
      <span className="header__minutes">{time.minutes}</span>
      <span className="header__seconds">{time.seconds}</span>
    </div>
  )
}
