import React from 'react'
import { useWindowSize } from 'usehooks-ts'

import { Button } from '_ui/Button'
import { Modal } from '_ui/Modal'

import type { ChildBoughtModalProps } from './ChildBoughtModal.props'

export function ChildBoughtModal({ onClose }: ChildBoughtModalProps) {
  const { width } = useWindowSize()
  const isDesktop = width > 991

  return (
    <Modal
      variant="childBought"
      title="Заявка на курс"
      onClose={isDesktop ? onClose : undefined}
      onBack={isDesktop ? undefined : onClose}
    >
      <div className={'child-bought__block'}>
        <p className={'child-bought__block-text'}>Батькам було відправлено заявку на придбання курсу </p>
        <ul className={'child-bought__list'}>
          <li>
            <span>x1</span>
            <p>Вступ до мови програмування Python початковий рівень для студентів з практичним застосуванням в реальних проєктах та інтерактивними завданнями</p>
            <p className={'child-bought__list-price'}>5 300 ₴</p>
          </li>
          <li>
            <span>x1</span>
            <p>Вступ до мови програмування Python початковий рівень для студентів з практичним застосуванням в реальних проєктах та інтерактивними завданнями</p>
            <p className={'child-bought__list-price'}>5 300 ₴</p>
          </li>
          <li>
            <span>x1</span>
            <p>Вступ до мови програмування Python початковий рівень для студентів з практичним застосуванням в реальних проєктах та інтерактивними завданнями</p>
            <p className={'child-bought__list-price'}>Безкоштовно</p>
          </li>
        </ul>
        <div className={'child-bought__buttons'}>
          <Button>головна</Button>
        </div>
      </div>
    </Modal>
  )
}
