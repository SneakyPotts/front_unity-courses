// 'use client' //if use useState

import type { PropsWithChildren } from 'react'

export default function BaseLayout({ children }: PropsWithChildren) {
  return (
    <>
      <aside>Aside menu</aside>
      <main className={'inner-layout'}>{children}</main>
    </>
  )
}
