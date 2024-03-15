'use client'

import classNames from 'classnames'
import React, { useContext, useState } from 'react'

import Image from 'next/image'

import { imgBlur } from '@assets/utils'
import { appContext } from '@components/Context/context'

import { ProfileInfoModal } from '_modals/ProfileInfoModal'

import type { TeacherCardProps } from './TeacherCard.props'

export function TeacherCard({ data, className, isStudent, isMain }: TeacherCardProps) {
  const { profile } = useContext(appContext)

  const [showProfileModal, setShowProfileModal] = useState(false)

  return (
    <div className={classNames('teacher-card', className)}>
      <div className="teacher-card__top">
        {isMain && (
          <span className={'courses-lesson__span'}>
            <svg>
              <use href="/img/sprite.svg#star-strok"></use>
            </svg>
          </span>
        )}
        <div className="teacher-card__image">
          <Image
            src={data.avatar || '/img/static/default-avatar.png'}
            width={65}
            height={65}
            {...imgBlur}
            alt={`${data.last_name} ${data.first_name} ${data.patronymic}`}
          />
        </div>
        <div className="teacher-card__info">
          <div
            className="teacher-card__name"
            onClick={() => setShowProfileModal(true)}
          >
            {data.last_name} {data.first_name} {data.patronymic}
          </div>
          {data?.qualification && <div className="teacher-card__status">{data.qualification}</div>}
        </div>
      </div>
      {(isStudent || profile?.id !== data.id) && (
        <button className="teacher-card__question">
          <svg className="teacher-card__question-svg">
            <use href="/img/sprite.svg#chat"></use>
          </svg>
          {isStudent ? 'Написати' : 'Задати питання'}
        </button>
      )}

      {showProfileModal && (
        <ProfileInfoModal
          onClose={() => setShowProfileModal(false)}
          teacherId={!isStudent ? data.id : undefined}
          studentId={isStudent ? data.id : undefined}
        />
      )}
    </div>
  )
}

// <div className={'teacher-card teacher-card--big'}>
//   <div className={'teacher-card__top'}>
//     <div className={'teacher-card__image'}>
//       <Image
//         src="https://loremflickr.com/640/360"
//         style={{ objectFit: 'cover' }}
//         alt="alt"
//         width={640}
//         height={360}
//         {...imgBlur}
//       />
//     </div>
//     <div className={'teacher-card__info'}>
//       <div className={'teacher-card__name'}>Кайдаш Людмила Миколаївна</div>
//       <div className={'courses-lesson__job teacher-card__status'}>Викладач математики, алгебри, геометрії</div>
//     </div>
//   </div>
//   <button className={'teacher-card__question'}>
//     <svg className={'teacher-card__question-svg'}>
//       <use href="/img/sprite.svg#message"></use>
//     </svg>
//     Задати питання
//   </button>
// </div>
