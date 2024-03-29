'use client'

import { useContext, useState } from 'react'

import Image from 'next/image'

import { CourseCatalogItem } from '@components/CourseCatalogItem'

import { PageWrapper } from '_ui/PageWrapper'

export default function Certificates() {
  return (
    <PageWrapper>
      <div className="certificates">
        <div className="certificates__inner">
          <div className={'certificates__block'}>
            <div className="certificates__info">
              <h2 className={'certificates__title'}>Отримувач сертифікату:</h2>
              <div className="certificates__student">
                <div className="certificates__student-img">
                  <Image
                    width={60}
                    height={60}
                    src={'https://loremflickr.com/640/360'}
                    alt="фото профили"
                  />
                </div>
                <div className={'certificates__student-name'}>Овчаренко Олександра</div>
              </div>
            </div>
            <div className={'certificates__card'}>{/* TODO карточка курса */}</div>
          </div>
          <div className={'certificates__content'}>
            <div className="certificates__content-img">
              <Image
                src={'/img/static/certificate-big.png'}
                width={850}
                height={1200}
                style={{ objectFit: 'cover' }}
                alt="фото сертифікату"
              />
            </div>
            <div className="certificates__content-btn">
              <button className={'btn btn--trans'}>
                <svg>
                  <use href="/img/sprite.svg#course-download"></use>
                </svg>
                завантажити
              </button>
              <button className={'btn btn--trans'}>
                <svg>
                  <use href="/img/sprite.svg#course-share"></use>
                </svg>
                поділитися
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
