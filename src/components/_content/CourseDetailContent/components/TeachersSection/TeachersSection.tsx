import React from 'react'

import Image from 'next/image'

import { imgBlur } from '@assets/utils'

import type { TeacherBoxProps, TeachersSectionProps } from './TeachersSection.props'

export function TeachersSection({ lectors }: TeachersSectionProps) {
  return (
    <div className="archive__about-info">
      <h3
        id="teachers"
        className={'archive__subtitle'}
      >
        Викладачі курсу
      </h3>
      <div className={'archive__personal'}>
        {lectors?.map((lector) => (
          <TeacherBox
            key={lector.id}
            {...lector}
          />
        ))}
      </div>
    </div>
  )
}

function TeacherBox({ id, last_name, first_name, patronymic, qualification, about_me, avatar }: TeacherBoxProps) {
  return (
    <div className={'archive__teaher'}>
      <div className={'archive__teaher-photo'}>
        <Image
          src={avatar || '/img/static/default-avatar.png'}
          fill
          style={{ objectFit: 'cover' }}
          {...imgBlur}
          alt={`${last_name} ${first_name} ${patronymic}`}
        />
      </div>
      <div className={'archive__person'}>
        <h3 className={'archive__person-name archive__subtitle'}>{`${last_name} ${first_name} ${patronymic}`}</h3>
        {!!qualification?.length && <p className={'archive__person-item archive__person-span'}>{qualification}</p>}
        {!!about_me?.length && <p className={'archive__person-text'}>{about_me}</p>}
      </div>
    </div>
  )
}
