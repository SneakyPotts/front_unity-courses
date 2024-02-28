import classNames from 'classnames'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import SimpleBar from 'simplebar-react'

import type { TDocument } from '@assets/types/globals'
import { uploadRulesCheck } from '@assets/utils'
import { UploadDocumentItem } from '@components/UploadDocument'

import { Button } from '_ui/Button'
import { Modal } from '_ui/Modal'

import type { UploadDocumentModalProps } from './UploadDocumentModal.props'

const availableTypes = ['doc', 'docx', 'pdf', 'jpeg', 'jpg', 'png', 'heic', 'txt', 'xls', 'xlsx', 'zip', 'rar', '7z', 'gzip', 'ppt', 'pptx']

export function UploadDocumentModal({ onClose, docType = 9, docList, handleUpload, handleRemoveItem, handleSubmit }: UploadDocumentModalProps) {
  const [filteredList, setFilteredList] = useState<TDocument[]>(docList || [])
  const [isUploadError, setIsUploadError] = useState('')
  const [fileSize, setFileSize] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isRequestError, setIsRequestError] = useState(false)

  const onDrop = useCallback(
    (files: File[]) => {
      setIsUploadError('')
      setIsLoaded(false)

      uploadRulesCheck(
        (file) => {
          setIsLoading(true)
          setIsRequestError(false)
          setFileSize(Number((file.size / 1024 / 1024).toFixed(1)))

          let body = new FormData()

          body.append('type', docType.toString())
          body.append('name', file.name)
          body.append('file', file)

          handleUpload(body)
            .then((res) => {
              console.log('uploadFile res', res)

              setIsLoaded(true)

              const timeout = setTimeout(() => {
                setIsLoading(false)
                setFilteredList((p) => [res, ...p])

                clearTimeout(timeout)
              }, 300)
            })
            .catch((err) => {
              console.log('uploadFile err', err?.data?.extra?.fields?.file)

              setIsLoading(false)
              setIsRequestError(true)
            })
        },
        files,
        availableTypes,
        setIsUploadError,
      )
    },
    [docType, handleUpload],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false, maxFiles: 1 })

  const handleRemove = (id: string) => {
    handleRemoveItem(id)
    setFilteredList((p) => p.filter((f) => f.id !== id))
  }

  return (
    <Modal
      variant={'upload'}
      title={'Завантаження документа'}
      onClose={onClose}
    >
      <form
        className="modal__from"
        id={'upload'}
      >
        <div
          className={classNames('modal__upload', { 'drag--active': isDragActive })}
          {...getRootProps()}
        >
          <svg className="modal__upload-svg">
            <use href="/img/sprite.svg#upload"></use>
          </svg>
          <div className={'modal__drop'}>
            <input {...getInputProps()} />

            {isDragActive ? (
              <span>
                Перетягніть <br /> файл сюди
              </span>
            ) : (
              <>
                <span>
                  Перетягніть <br />
                  або{' '}
                </span>
                <span className={'modal__drop--text'}>оберіть файл</span>
              </>
            )}
            {!!isUploadError.length && (
              <div
                className="document__error"
                style={{ justifyContent: 'center' }}
              >
                <svg className="document__error-icon">
                  <use href="/img/sprite.svg#warn"></use>
                </svg>
                {isUploadError}
              </div>
            )}
          </div>
        </div>
        <SimpleBar className="modal__case">
          <ul className="modal__documents">
            {(isLoading || isRequestError) && (
              <UploadDocumentItem
                name={'Завантаження...'}
                type={'upload'}
                fileSize={fileSize}
                onLoading
                isLoaded={isLoaded}
                isError={isRequestError}
              />
            )}
            {filteredList?.map((v) => (
              <UploadDocumentItem
                key={v.id}
                name={v.file}
                type={'upload'}
                handleRemove={() => handleRemove(v.id)}
              />
            ))}
          </ul>
        </SimpleBar>

        <Button
          className={'modal__btn'}
          onClick={() => {
            if (handleSubmit) {
              handleSubmit()
            } else if (onClose) {
              onClose()
            }
          }}
        >
          Відправити на перевірку
        </Button>
      </form>
    </Modal>
  )
}
