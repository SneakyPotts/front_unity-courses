'use client'

import classNames from 'classnames'
import React, { useContext } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { AsideNavigation } from '@components/AsideNavigation'
import { appContext } from '@components/Context/context'

import type { AsideProps } from './Aside.props'

export function Aside({ variant = 'main', className }: AsideProps) {
  const { asideIsOpen, handleSetAsideIsOpen } = useContext(appContext)

  return (
    <aside className={classNames('aside', className, { 'aside--main': variant === 'main', 'aside--static': variant === 'static' }, { 'aside--hide': !asideIsOpen })}>
      <div className="aside__wrapper">
        {variant === 'main' && (
          <button
            className="aside__btn"
            onClick={handleSetAsideIsOpen}
            id="aside-btn"
          >
            <svg className="aside__btn-svg">
              <use href="/img/sprite.svg#aside-arrows"></use>
            </svg>
          </button>
        )}

        <div className="aside__top">
          <Link
            href="/"
            className="aside__logo"
          >
            <Image
              src="/img/aside-logo.svg"
              width={92}
              height={22}
              alt="alt"
            />
          </Link>
        </div>
        {variant === 'main' && <AsideNavigation />}
      </div>
    </aside>
  )
}
