import classNames from 'classnames'
import React from 'react'

import { Tabs } from '_ui/Tabs'

import type { PageWrapperProps } from './PageWrapper.props'

export function PageWrapper({ children, ...props }: PageWrapperProps) {
  return (
    <>
      {props.list && (
        <Tabs
          {...props}
          className={classNames('tabs-area', props.className)}
        />
      )}

      <main className="content main-area">
        <div className="content__container container">{children}</div>
      </main>
    </>
  )
}
