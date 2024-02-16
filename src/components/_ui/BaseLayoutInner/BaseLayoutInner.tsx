'use client'

import classNames from 'classnames'
import React, { useContext, useLayoutEffect } from 'react'

import { appContext } from '@components/Context/context'
import { Footer } from '@components/Footer'
import { Header } from '@components/Header'

import type { BaseLayoutInnerProps } from './BaseLayoutInner.props'

export function BaseLayoutInner({ about, children }: BaseLayoutInnerProps) {
  const { asideIsOpen, setProfile } = useContext(appContext)

  useLayoutEffect(() => {
    setProfile(about)
  }, [about])

  return (
    <div className={classNames('main inner-layout', { 'main--active': asideIsOpen })}>
      <Header
        className="header-area"
        profile={about}
      />

      {children}

      <Footer className="footer-area" />
    </div>
  )
}
