import React, { type PropsWithChildren } from 'react'

import { Aside } from '@components/Aside'
import { aboutMeRequest, myBasketRequest } from '@http/profile/server'
import { getWishList } from '@http/student/server'

import { BaseLayoutInner } from '_ui/BaseLayoutInner'
import { RequestError } from '_ui/RequestError'

export default async function BaseLayout({ children }: PropsWithChildren) {
  const [aboutMe, basket, wishlist] = await Promise.all([aboutMeRequest(), myBasketRequest(), getWishList()])

  const isError = aboutMe.error || basket.error

  if (isError) return <RequestError message="Щось пішло не так..." />

  return (
    <div className={'layout'}>
      <Aside className="aside-area" />

      <BaseLayoutInner
        about={aboutMe.data}
        basket={basket.data?.courses}
        wishlist={wishlist.data}
      >
        {children}
      </BaseLayoutInner>
    </div>
  )
}
