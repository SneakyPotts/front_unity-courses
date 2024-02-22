'use client'

import classNames from 'classnames'
import React, { useContext, useLayoutEffect } from 'react'
import { useReadLocalStorage } from 'usehooks-ts'

import { appContext } from '@components/Context/context'
import { Footer } from '@components/Footer'
import { Header } from '@components/Header'
import { TBasketCourse } from '@http/profile/type'

import type { BaseLayoutInnerProps } from './BaseLayoutInner.props'

export function BaseLayoutInner({ about, basket, children }: BaseLayoutInnerProps) {
  const { asideIsOpen, setProfile, setBasket } = useContext(appContext)

  const localBasket: TBasketCourse[] | null = useReadLocalStorage('basket', { deserializer: JSON.parse })

  useLayoutEffect(() => {
    setProfile(about)
    setBasket(basket || localBasket || [])
  }, [about, basket])

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
