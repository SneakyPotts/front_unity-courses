'use client'

import classNames from 'classnames'
import { type PropsWithChildren, useContext } from 'react'

import { Aside } from '@components/Aside'
import { appContext } from '@components/Context/context'
import { Footer } from '@components/Footer'
import { Header } from '@components/Header'

export default function BaseLayout({ children }: PropsWithChildren) {
  const { asideIsOpen } = useContext(appContext)

  return (
    <>
      {/*Aside*/}
      {/*Header - if "asideIsOpen === true" add className "aside--open"*/}
      {/*Main - if "asideIsOpen === true" add className "aside--open"*/}
      {/*Footer - if "asideIsOpen === true" add className "aside--open"*/}

      <div className={'layout'}>
        {/*TODO: remove this <div className={'layout'}>*/}
        <Aside className="aside-area" />

        <div className={classNames('main inner-layout', { 'main--active': asideIsOpen })}>
          {/*TODO: remove this <div className={classNames('main inner-layout', { 'main--active': asideIsOpen })}>*/}

          <Header className="header-area" />

          <main className="container main-area">{children}</main>

          <Footer className="footer-area" />
        </div>
      </div>
    </>
  )
}
