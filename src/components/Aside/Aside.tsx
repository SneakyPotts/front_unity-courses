'use client'

import classNames from 'classnames'
import React, { useContext } from 'react'

import { AsideNavigation } from '@components/AsideNavigation'

// import AsideLogo from '@assets/img/static/aside-logo.svg'

import type { AsideProps } from './Aside.props'
import Link from 'next/link'
import Image from 'next/image'
import { appContext } from '@components/Context/context'

export function Aside({ variant = 'main' }: AsideProps) {
  const { asideIsOpen, handleSetAsideIsOpen } = useContext(appContext)

  return (
    <aside className={classNames('aside', { 'aside--main': variant === 'main', 'aside--static': variant === 'static' }, { 'aside--hide': !asideIsOpen })}>
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
            {/*<AsideLogo />*/}
            <Image
              src="/img/aside-logo.svg"
              fill
              alt="alt"
            />
          </Link>
        </div>
        {variant === 'main' && <AsideNavigation />}
      </div>
    </aside>
  )
}
