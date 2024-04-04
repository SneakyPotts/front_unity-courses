'use client'

import React from 'react'

import Image from 'next/image'

import default_avatar from '@assets/img/static/default-avatar.png'
import { CourseCatalogItem } from '@components/CourseCatalogItem'
import { useSetHeaderParams } from '@hooks/useSetHeaderParams'

import { Button } from '_ui/Button'
import { PageWrapper } from '_ui/PageWrapper'

import type { CertificatePageContentProps } from './CertificatePageContent.props'

export function CertificatePageContent({ data }: CertificatePageContentProps) {
  useSetHeaderParams({ title: '' })

  return (
    <PageWrapper>
      <div className="certificates__inner">
        <div className="certificates__block">
          <div className="certificates__info">
            <h2 className="certificates__title">Отримувач сертифікату:</h2>
            <div className="certificates__student">
              <div className="certificates__student-img">
                <Image
                  width={60}
                  height={60}
                  src={data.student.avatar || default_avatar}
                  alt={`${data.student.first_name} ${data.student.last_name}`}
                />
              </div>
              <div className="certificates__student-name">{`${data.student.first_name} ${data.student.last_name}`}</div>
            </div>
          </div>
          <div className="certificates__card">
            <CourseCatalogItem
              {...data.course}
              isCertified
            />
          </div>
        </div>
        <div className="certificates__content">
          <div className="certificates__content-img">
            <Image
              src={data.certificate_image}
              fill
              sizes="45vw"
              style={{ objectFit: 'cover' }}
              alt={data.course.title}
            />
          </div>
          <div className="certificates__content-btn">
            <Button
              variant="border"
              href={data.certificate_pdf}
              target="_blank"
            >
              <svg>
                <use href="/img/sprite.svg#course-download"></use>
              </svg>
              завантажити
            </Button>

            <Button variant="border">
              <svg>
                <use href="/img/sprite.svg#course-share"></use>
              </svg>
              поділитися
            </Button>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
