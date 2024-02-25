import React from 'react'

import type { PageWrapperProps } from './PageWrapper.props'

export function PageWrapper({ aboveElement, children }: PageWrapperProps) {
  return (
    <>
      {aboveElement}

      <main className="content main-area">
        <div className="content__container container">{children}</div>
      </main>
    </>
  )
}
