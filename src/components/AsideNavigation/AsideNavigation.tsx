'use client'

import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'

import useToggle from '@hooks/useToggle'

import { extraClass, navListChildren } from './AsideNavigation.data'
import type { AsideNavigationProps, NavAccordionProps } from './AsideNavigation.props'
import Link from 'next/link'
// import { useRouter } from 'next/router'

export function AsideNavigation({ ...props }: AsideNavigationProps) {
  // const router = useRouter()

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
                className={classNames('nav__link', { 'nav__link--active': v.link === 'some_value' })}
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
    </nav>
  )
}

function NavAccordion({ ...props }: NavAccordionProps) {
  const dropRef = useRef<HTMLDivElement>(null)

  const [open, setOpen] = useToggle(false)
  const [dropHeight, setDropHeight] = useState(0)

  useEffect(() => {
    if (dropRef?.current) {
      setDropHeight(dropRef.current?.scrollHeight)
    }
  }, [props])

  return (
    <div className={classNames('nav__accordion', { 'nav__accordion--active': open })}>
      <div className="nav__top">
        <Link
          href={props.link}
          // className={({ isActive }) => classNames('nav__link', { 'nav__link--active': isActive || location.pathname.includes(props.link.slice(0, -1)) })}
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
          <svg className="nav__open-arrow">
            <use href="/img/sprite.svg#arrow-down-mini"></use>
          </svg>
        </button>
      </div>
      <div
        ref={dropRef}
        className="nav__down"
        style={{ maxHeight: open ? dropHeight + 'px' : 0 }}
      >
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
