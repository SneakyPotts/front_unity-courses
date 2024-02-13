import classNames from 'classnames'
import React, { type PropsWithChildren, useEffect } from 'react'

import { Portal } from '@components/Portal'

import { useAnimate } from '@hooks/useAnimate'

import type { ModalProps } from './Modal.props'

const typesMatch = {
  login: 'login',
  resetPass: 'reset-password',
  checkEmail: 'check-email',
  newPass: 'create-new-password',
  upload: 'upload modal--big',
  deposit: 'deposit modal--mobile',
  thanks: 'thanks modal--mobile',
  error: 'error modal--mobile',
  changePhoto: 'change-photo modal--big',
  rotate: 'rotate modal--big',
  teacherCard: 'teacher-card-student',
  studentCard: 'student-card',
  courseInvite: 'course-invite',
  signInCourses: 'signIn-courses',
  empty: '',
}

export function Modal({ variant, title, tip, onClose, onBack, children }: PropsWithChildren<ModalProps>) {
  const [isAnimate, handleClose] = useAnimate(onClose)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'relative'

    document.getElementsByTagName('html')[0].style.overflow = 'hidden'
    document.getElementsByTagName('html')[0].style.position = 'relative'

    return () => {
      document.body.removeAttribute('style')
      document.getElementsByTagName('html')[0].removeAttribute('style')
    }
  }, [])

  return (
    <Portal>
      <div className={classNames('modal', typesMatch[variant], { 'modal--open': !isAnimate, 'modal--close': isAnimate })}>
        <div
          className="modal__body"
          onClick={handleClose}
        >
          <div
            className="modal__content"
            onClick={(ev) => ev.stopPropagation()}
          >
            <div className="modal__main">
              {onClose && (
                <button
                  className="modal__close"
                  onClick={handleClose}
                >
                  <svg className="modal__close-svg">
                    <use href="/img/sprite.svg#close"></use>
                  </svg>
                </button>
              )}

              {onBack && (
                <button className="modal__back">
                  <svg className="modal__back-svg">
                    <use href="/img/sprite.svg#arrow-back"></use>
                  </svg>
                </button>
              )}

              <svg className="modal__logo">
                <use href="/img/sprite.svg#full-logo"></use>
              </svg>
              <h2 className="modal__title">{title}</h2>

              {tip && <p className="modal__tip">{tip}</p>}

              <div className="modal__wrapper">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  )
}
