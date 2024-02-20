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

function TeacherBox({ id, last_name, first_name, patronymic, avatar }: TeacherBoxProps) {
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
        <p className={'archive__person-text'}>
          Вчителька ліцею № 2 м. Житомира, поетка і письменниця, організаторка щорічного Всеукраїнського Літературного фестивалю «Шодуарівська Альтанка» у м. Житомир
        </p>
        <ul className={'archive__person-list '}>
          <li className={'archive__person-item'}>
            <span className={'archive__person-span'}>Креативна Інтеграція Технологій:</span> Впровадження сучасних технологій у навчальний процес для створення вражаючих
            мистецьких проектів.
          </li>
          <li className={'archive__person-item'}>
            <span className={'archive__person-span'}>Ефективне Міжособистісне Спілкування:</span> Здатність вести діалог з учнями, стимулюючи висловлювання їхнього творчого
            потенціалу.
          </li>
          <li className={'archive__person-item'}>
            <span className={'archive__person-span'}>Громадська Активність:</span> Активна участь у заходах мистецької спільноти та організація мистецьких виставок та
            конкурсів серед учнів.
          </li>
        </ul>
      </div>
    </div>
  )
}
