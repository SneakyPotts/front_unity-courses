'use client'

import React, { useContext, useState } from 'react'

import dynamic from 'next/dynamic'
import Image from 'next/image'

import { appContext } from '@components/Context/context'

import type { TeacherForCourseProps } from './TeacherForCourse.props'

const ProfileInfoModal = dynamic(() => import('_modals/ProfileInfoModal').then((mod) => mod.ProfileInfoModal))

export function TeacherForCourse({ lecturer }: TeacherForCourseProps) {
  const { profile } = useContext(appContext)

  const [isShowInfoModal, setIsShowInfoModal] = useState(false)

  return (
    <div className={'courses-catalog__teacher'}>
      <div className={'courses-catalog__teacher-img'}>
        <Image
          src={lecturer.avatar || '/img/static/default-avatar.png'}
          width={20}
          height={20}
          style={{ objectFit: 'cover' }}
          alt={`${lecturer.first_name} ${lecturer.last_name}`}
        />
      </div>
      <button onClick={() => !!profile && setIsShowInfoModal(true)}>{`${lecturer.last_name} ${lecturer.first_name[0]}. ${lecturer.patronymic[0]}.`}</button>

      {isShowInfoModal && (
        <ProfileInfoModal
          teacherId={lecturer.id}
          onClose={() => setIsShowInfoModal(false)}
        />
      )}
    </div>
  )
}
