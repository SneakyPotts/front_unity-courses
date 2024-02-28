import classNames from 'classnames'
import React, { memo, useEffect, useMemo, useState } from 'react'

import { nameFromUrl } from '@assets/utils'

import { UploadDocumentPdfPreview } from '../UploadDocumentPdfPreview'
import type { UploadDocumentItemProps } from './UploadDocumentItem.props'

const imageTypes = ['jpeg', 'jpg', 'png'] //heic

export const UploadDocumentItem = memo(function UploadDocumentItem({ name, type, handleRemove, link, fileSize = 0, onLoading, isLoaded, isError }: UploadDocumentItemProps) {
  const [progress, setProgress] = useState(0)

  const itFile = useMemo(() => {
    const format = (name?.split('.').pop() || '').toLowerCase()

    if (imageTypes.includes(format)) return 'image'

    switch (format) {
      case 'pdf':
        return '-pdf'
      case 'doc':
      case 'docx':
        return '-word'
      case 'xls':
      case 'xlsx':
        return '-excel'
      case 'ppt':
      case 'pptx':
        return '-ppoint'
      default:
        return '-image'
    }
  }, [name])

  useEffect(() => {
    setProgress(0)

    if (onLoading && !isError) {
      const timeout = setTimeout(() => {
        setProgress(85)
        clearTimeout(timeout)
      }, 500)
    }
  }, [isError, onLoading])

  return (
    <li className={classNames('document-block__item document', { 'document--error': isError })}>
      <div className="document__wrapper">
        {type === 'upload' ? (
          <button
            className="document__remove"
            type="button"
            aria-label="Видалити цей документ"
            onClick={handleRemove}
          >
            <svg className="document__remove-svg">
              <use href="/img/sprite.svg#remove"></use>
            </svg>
          </button>
        ) : (
          <a
            href={link}
            className="document__remove"
            type="button"
            aria-label="Завантажити цей документ"
            download={link}
            target="_blank"
            rel="noreferrer"
          >
            <svg className="document__remove-svg">
              <use xlinkHref="/img/sprite.svg#download-file"></use>
            </svg>
          </a>
        )}
        <div className="document__preview">
          {itFile === 'image' && (
            <img
              src={link ?? name}
              alt={nameFromUrl(link ?? name)}
            />
          )}

          {itFile === '-pdf' && <UploadDocumentPdfPreview file={link ?? name} />}

          {itFile !== 'image' && itFile !== '-pdf' && (
            <svg className="document__image">
              <use href={`/img/sprite.svg#file${itFile}`}></use>
            </svg>
          )}
        </div>
        {!isError && <span className="document__title">{nameFromUrl(name)}</span>}
        {/*{!!fileSize && <small className="document__weight">{`${fileSize} mb`}</small>}*/}

        {onLoading && !isError && (
          <div className="document__progress progress">
            <span className="progress-line">
              <span style={{ width: `${isLoaded ? 100 : progress}%` }}></span>
            </span>
            {`${isLoaded ? 100 : progress} %`}
          </div>
        )}
      </div>
      {isError && (
        <div className="document__error">
          <svg className="document__error-icon">
            <use href="/img/sprite.svg#warn"></use>
          </svg>
          Завантажте ще раз
        </div>
      )}
    </li>
  )
})
