'use client'

import React, { useState } from 'react'
import { usePopper } from 'react-popper'
import { TelegramShareButton, ViberShareButton } from 'react-share'

import Image from 'next/image'

import default_avatar from '@assets/img/static/default-avatar.png'
import { CourseCatalogItem } from '@components/CourseCatalogItem'
import { useSetHeaderParams } from '@hooks/useSetHeaderParams'

import { Button } from '_ui/Button'
import { PageWrapper } from '_ui/PageWrapper'
import { toastPromise } from '_ui/ToastUtils'

import type { CertificatePageContentProps } from './CertificatePageContent.props'

export function CertificatePageContent({ data }: CertificatePageContentProps) {
  const [isShowShare, setIsShowShare] = useState(false)

  const [referenceElement, setReferenceElement] = useState<any>(null)
  const [popperElement, setPopperElement] = useState<any>(null)

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'top-end',
    modifiers: [{ name: 'offset', options: { offset: [-10, 4] } }],
  })

  const handleCopy = () => {
    toastPromise({
      handler: navigator.clipboard.writeText(window.location.href),
      successCallback: () => setIsShowShare(false),
      successMessage: 'Посилання на сертифікат успішно скопіqjdfyj',
    })
  }

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
          <div
            ref={setReferenceElement}
            className="certificates__content-btn"
          >
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

            <Button
              variant="border"
              onClick={() => setIsShowShare((p) => !p)}
            >
              <svg>
                <use href="/img/sprite.svg#course-share"></use>
              </svg>
              поділитися
            </Button>
          </div>
        </div>
      </div>
      {isShowShare && (
        <div
          ref={setPopperElement}
          className="certificates__share"
          style={styles.popper}
          {...attributes}
        >
          <button
            type="button"
            onClick={handleCopy}
          >
            <Image
              src="/img/share.png"
              width={32}
              height={32}
              alt="viber"
              title="Copy to Clipboard"
            />
          </button>
          <TelegramShareButton url={window.location.href}>
            <Image
              src="/img/telegram.png"
              width={32}
              height={32}
              alt="telegram"
              title="Share to Telegram"
            />
          </TelegramShareButton>
          <ViberShareButton url={window.location.href}>
            <Image
              src="/img/viber.png"
              width={32}
              height={32}
              alt="viber"
              title="Share to Viber"
            />
          </ViberShareButton>
        </div>
      )}
    </PageWrapper>
  )
}
