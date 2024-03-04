import React, { ReactNode } from 'react'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { PageWrapper } from '_ui/PageWrapper'

type TChildren = 'children' | 'aside'

export default function MyCoursesLayout({ children, aside }: Record<TChildren, ReactNode>) {
  const token = cookies().get('/')

  if (!token) redirect('/')

  return (
    <PageWrapper>
      <section className={'my-catalog'}>
        {children}
        {aside}
      </section>
    </PageWrapper>
  )
}
