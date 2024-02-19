import React from 'react'

import { Button } from '_ui/Button'
import { Modal } from '_ui/Modal'

import type { CourseInviteModalProps } from './CourseInviteModal.props'

export function CourseInviteModal({ onClose }: CourseInviteModalProps) {
  return (
    <Modal
      variant="courseInvite" /*course-invite*/
      title="Запрос на курс"
      onClose={onClose}
    >
      <div className={'modal__main-decor'}>
        <svg className={'modal__coures-svg'}>
          <use href="/img/sprite.svg#rocket"></use>{' '}
        </svg>
      </div>
      <div className={'modal__main-box'}>
        <p className={'modal__main-text'}>Батькам буде відправлено запрос на покупку курсу “Вступ до мови програмування Python“</p>
      </div>
      <div className={'modal__main-buttons'}>
        <Button
          className={'some_button modal__main-button '}
          variant={'border'}
        >
          відхилити
        </Button>
        <Button className={'some_button modal__main-button'}>підтвердити</Button>
      </div>
    </Modal>
  )
}
