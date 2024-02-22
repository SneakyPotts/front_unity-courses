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
      variant="addModal"
      title="Додати курс"
      onClose={isDesktop ? onClose : undefined}
      onBack={isDesktop ? undefined : onClose}
    >
      <div className={'add-modal__block'}>
        <div className={'add-modal__decor'}>
          <svg>
            <use href="/img/sprite.svg#coure-list"></use>
          </svg>
        </div>
        <div className={'add-modal__text'}>
          <p>Ви будете додані до курсу “Вступ до мови програмування Python“</p>
        </div>
        <div className={'add-modal__buttons'}>
          <Button
            className={'some_button'}
            variant={'border'}
          >
            відхилити
          </Button>
          <Button
            className={'some_button'}
            variant={'gray'}
          >
            підтвердити
          </Button>
        </div>
      </div>
    </Modal>
  )
}
