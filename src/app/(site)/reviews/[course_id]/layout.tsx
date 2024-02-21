import type { ReactNode } from 'react'

type TChildren = 'children' | 'aside'

export default function Layout({ children, aside }: Record<TChildren, ReactNode>) {
  return (
    <div className="content">
      <div className="content__container container">
        <section className={'archive'}>
          <div className={'archive__inner'}>
            {children}
            {aside}
          </div>
        </section>
      </div>
    </div>
  )
}
