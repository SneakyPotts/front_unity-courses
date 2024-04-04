import classNames from 'classnames'
import 'cropperjs/dist/cropper.css'
import React, { useCallback, useRef, useState } from 'react'
import { Cropper, type ReactCropperElement } from 'react-cropper'
import { useDropzone } from 'react-dropzone'
import { useToggle } from 'usehooks-ts'

import { uploadRulesCheck } from '@assets/utils'
import { useQueryProfile } from '@http/profile/client'

import { Button } from '_ui/Button'
import { Modal } from '_ui/Modal'

import type { UploadAvatarModalProps, UploadAvatarProps } from './UploadAvatar.props'

const types = ['jpeg', 'jpg', 'png', 'heic']

export function UploadAvatar({ avatar, userID, alt, warn, className, externalRequest, editable }: UploadAvatarProps) {
  const [uploadModalShow, setUploadModalShow] = useToggle(false)

  return (
    <div className={classNames('load-avatar', className)}>
      <div className="load-avatar__label">
        <div className="load-avatar__image">
          {avatar ? (
            <img
              src={avatar}
              width={129}
              height={129}
              alt={alt || 'profile avatar'}
            />
          ) : (
            <svg className="load-avatar__image-svg">
              <use href="/img/sprite.svg#avatar-image"></use>
            </svg>
          )}
        </div>
        {editable && (
          <button
            type={'button'}
            className={classNames('load-avatar__add btn-9 btn-10 btn-11')}
            onClick={setUploadModalShow}
          >
            {avatar ? 'Змінити фото' : 'Додати фото'}
          </button>
        )}
      </div>
      {warn && (
        <div className="load-avatar__warn">
          <div className="load-avatar__top">
            <svg className="field__icon">
              <use href="/img/sprite.svg#warn"></use>
            </svg>
            Увага!
          </div>
          <div className="load-avatar__text">{warn}</div>
        </div>
      )}

      {uploadModalShow && (
        <UploadAvatarModal
          onClose={setUploadModalShow}
          userID={userID}
          externalRequest={externalRequest}
        />
      )}
    </div>
  )
}

function UploadAvatarModal({ userID, onClose, externalRequest }: UploadAvatarModalProps) {
  const editor = useRef<ReactCropperElement>(null)

  const { avatar } = useQueryProfile()

  const [image, setImage] = useState('')
  const [isUploadError, setIsUploadError] = useState('')
  const [onEdit, setOnEdit] = useState(false)

  const handleRotate = () => {
    editor.current?.cropper.rotate(-45)
  }

  const getCropData = () => {
    editor.current?.cropper.getCroppedCanvas().toBlob(
      (blob: Blob | null) => {
        if (blob) {
          let formData = new FormData()

          formData.append('avatar', blob, `avatar${Date.now()}.jpeg`)

          userID &&
            avatar({ user_id: userID, body: formData })
              .then((res) => console.log('uploadAvatar res', res))
              .catch((err) => console.log('uploadAvatar err', err))
              .finally(() => {
                onClose()
              })
        }
      },
      'image/jpeg',
      75,
    )
  }

  const onDrop = useCallback((files: File[]) => {
    setIsUploadError('')

    uploadRulesCheck(
      () => {
        const reader = new FileReader()

        reader.onload = () => {
          setImage(reader.result as any)
        }

        reader.readAsDataURL(files[0])

        setOnEdit(true)
      },
      files,
      types,
      setIsUploadError,
    )
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false, maxFiles: 1 })

  return (
    <Modal
      variant={'upload'}
      title={'Зміна зображення профілю'}
      onClose={onClose}
    >
      {onEdit ? (
        <>
          <Cropper
            ref={editor}
            src={image}
            style={{ height: 305, width: '100%' }}
            className={'modal__settings'}
            viewMode={2}
            aspectRatio={1}
            responsive={true}
            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
            background={false}
            guides={true}
            zoomTo={0.1}
            minCropBoxHeight={250}
            minCropBoxWidth={250}
            autoCropArea={1}
            movable={true}
          />
          <button
            className="modal__rotate"
            onClick={handleRotate}
          >
            <svg>
              <use href="/img/sprite.svg#rotate"></use>
            </svg>
            Обернути
          </button>
          <div className="modal__button">
            <Button
              variant={'border'}
              className={'modal__btn'}
              onClick={() => setOnEdit(false)}
            >
              Завантажити заново
            </Button>
            <Button
              className={'modal__btn'}
              onClick={getCropData}
            >
              <svg
                className="types__icon-svg"
                style={{ fill: '#fff' }}
              >
                <use href="/img/sprite.svg#check"></use>
              </svg>
              Зберегти
            </Button>
          </div>
        </>
      ) : (
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
      )}
    </Modal>
  )
}
