import React, { ReactNode } from 'react'

import { PageWrapper } from '_ui/PageWrapper'

type TChildren = 'children' | 'aside'

export default function MyCoursesLayout({ children, aside }: Record<TChildren, ReactNode>) {
  return (
    <PageWrapper>
      <section className={'my-catalog'}>
        {children}
        {aside}
      </section>
    </PageWrapper>
  )
}
