'use client'

import classNames from 'classnames'
import React, { useState } from 'react'
import { useToggle } from 'usehooks-ts'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '_ui/Button'

import { extraClass, navListChildren } from './AsideNavigation.data'
import type { AsideNavigationProps, NavAccordionProps } from './AsideNavigation.props'

export function AsideNavigation({}: AsideNavigationProps) {
  const pathname = usePathname()

  const [navList, setNavList] = useState<NavAccordionProps[]>(navListChildren)

  return (
    <nav className="aside__navigation nav">
      <ul className="nav__list">
        {navList?.map((v) => (
          <li
            key={`${v.id}${v.name}`}
            className={classNames('nav__item', extraClass[v.link])}
          >
            {!!v?.list?.length ? (
              <NavAccordion {...v} />
            ) : (
              <Link
                className={classNames('nav__link', { 'nav__link--active': pathname?.endsWith(v.link) })}
                href={v.link}
              >
                <svg className="nav__link-svg">
                  <use href={`/img/sprite.svg#${v.imgId}`}></use>
                </svg>

                <span className="nav__link-text">{v.name}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
      <Button
        variant="border"
        className="aside__button-link"
        fulFill
        href="https://front-unity.vercel.app/"
        target="_blank"
      >
        <svg className="archive__data-svg">
          <use href="/img/sprite.svg#home"></use>
        </svg>
        <span>Школа</span>
      </Button>
    </nav>
  )
}

function NavAccordion({ pathname, ...props }: NavAccordionProps) {
  const [open, setOpen] = useToggle(false)

  return (
    <div className={'nav__accordion'}>
      <div className="nav__top">
        <Link
          href={props.link}
          className={classNames('nav__link', { 'nav__link--active': pathname?.endsWith(props.link) })}
        >
          <svg className="nav__link-svg">
            <use href={`/img/sprite.svg#${props.imgId}`}></use>
          </svg>
          <span className="nav__link-text">{props.name}</span>
        </Link>
        <button
          className="nav__open"
          onClick={setOpen}
          aria-expanded={open}
          aria-label={open ? 'Закрити блок меню' : 'Відкрити меню'}
        >
          <svg className={classNames('nav__open-arrow', { '--open': open })}>
            <use href="/img/sprite.svg#arrow-down-mini"></use>
          </svg>
        </button>
      </div>
      <div className={classNames('nav__down', { '--open': open })}>
        <ul className="nav__sublist">
          {props.list?.map((w) => (
            <li
              key={w.name}
              className="nav__subitem"
            >
              <Link
                href={w.link}
                className="nav__sublink"
              >
                {w.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
