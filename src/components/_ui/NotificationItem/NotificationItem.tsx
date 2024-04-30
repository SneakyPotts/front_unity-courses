import classNames from 'classnames'
import { format, parseISO } from 'date-fns'
import React from 'react'

import type { NotificationItemProps } from './NotificationItem.props'

export function NotificationItem({ ...props }: NotificationItemProps) {
  return (
    <li className={classNames('notifications__item', { 'notifications__item--blue': !props.is_read, 'notifications__item--read': props.is_read })}>
      <svg className="notifications__item-icon">
        <use href="/img/sprite.svg#warn"></use>
      </svg>
      <div className="notifications__item-text">
        <div dangerouslySetInnerHTML={{ __html: props.content || '' }} />
        {/*<div className="notifications__date date date--orange">15.04 9:00</div>*/}
      </div>
      <time className="notifications__item-time">{format(parseISO(props.created_at), 'dd.MM.yyyy - HH:mm')}</time>
    </li>
  )
}
