import classNames from 'classnames'
import React, { type PropsWithChildren } from 'react'

import Link from 'next/link'

import type { CustomLinkProps } from './CustomLink.props'

export function CustomLink({ href, className, children }: PropsWithChildren<CustomLinkProps>) {
  return (
    <Link
      href={href}
      className={classNames('link', className)}
    >
      {children}
    </Link>
  )
}
