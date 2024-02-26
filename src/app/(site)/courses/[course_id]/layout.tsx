import type { ReactNode } from 'react'

import { PageWrapper } from '_ui/PageWrapper'

type TChildren = 'children' | 'aside'

export default function Layout({ children, aside }: Record<TChildren, ReactNode>) {
  return (
    <PageWrapper>
      <section className={'archive'}>
        <div className={'archive__inner'}>
          {children}
          {aside}
        </div>
      </section>
    </PageWrapper>
  )
}
