import React from 'react'

import { Modal } from '_ui/Modal'

import type { CourseInviteModalProps } from './CourseInviteModal.props'

export function CourseInviteModal({ onClose }: CourseInviteModalProps) {
  return (
    <Modal
      variant="courseInvite" /*course-invite*/
      title="Запрос на курс"
      onClose={onClose}
    >
      <div className={'request'}>
        <div className={'request__inner'}></div>
      </div>
    </Modal>
  )
}
