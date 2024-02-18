import React, { type PropsWithChildren } from 'react'

import { Aside } from '@components/Aside'
import { AboutMeRequest } from '@http/profile/server'

import { BaseLayoutInner } from '_ui/BaseLayoutInner'

export default async function BaseLayout({ children }: PropsWithChildren) {
  const { data } = await AboutMeRequest()

  return (
    <div className={'layout'}>
      <Aside className="aside-area" />

      <BaseLayoutInner about={data}>{children}</BaseLayoutInner>
    </div>
  )
}
