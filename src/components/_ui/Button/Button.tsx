'use client'

import classNames from 'classnames'
import React, { MouseEventHandler } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import type { ButtonProps } from './Button.props'

export function Button({ variant = 'accent', href, target, type = 'button', onClick, className, disabled, children, fulFill, ...props }: ButtonProps) {
  const router = useRouter()
  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (href) {
      target ? window.open(href, '_blank')?.focus() : router.push(href)
    } else {
      onClick && onClick(e)
    }
  }

  if (href)
    return (
      <Link
        className={classNames('btn', className, {
          'btn--accent': variant === 'accent',
          'btn--grey': variant === 'gray',
          'btn--trans': variant === 'border',
          fulfill: fulFill,
        })}
        href={href}
        target={target}
        rel="noopener noreferrer"
      >
        {children}
      </Link>
    )

  return (
    <button
      type={type}
      className={classNames('btn', className, {
        'btn--accent': variant === 'accent',
        'btn--grey': variant === 'gray',
        'btn--trans': variant === 'border',
        fulfill: fulFill,
      })}
      disabled={variant === 'gray' || disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}
