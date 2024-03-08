import React from 'react'

import type { TLayoutProps } from '@assets/types/globals'

import { PageWrapper } from '_ui/PageWrapper'

export default function LessonLayout({ children }: TLayoutProps) {
  return (
    <PageWrapper>
      <section className={'courses-lesson'}>
        <div className={'courses-lesson__inner'}>{children}</div>
      </section>
    </PageWrapper>
  )
}
