import classNames from 'classnames'
import React, { memo, useState } from 'react'

import { Button } from '_ui/Button'

import { UploadDocumentBlockListProps, UploadDocumentBlockTitleProps, UploadDocumentProps } from './UploadDocument.props'
import { UploadDocumentItem } from './components/UploadDocumentItem'
import { UploadDocumentModal } from './components/UploadDocumentModal'

export function UploadDocument({
  docType = 10 /*task file type*/,
  docList = [],
  className,
  handleUpload,
  handleRemoveItem,
  editable /*TODO: make not editable block*/,
}: UploadDocumentProps) {
  const [showUploadModal, setShowUploadModal] = useState(false)

  return (
    <div className={classNames('document-block', className)}>
      <UploadDocumentBlockTitle docType={docType} />

      <Button
        variant={'border'}
        onClick={() => setShowUploadModal(true)}
      >
        <svg className="btn__icon">
          <use href="/img/sprite.svg#download"></use>
        </svg>
        Завантажити
      </Button>

      <UploadDocumentBlockList
        docList={docList}
        docType={docType}
        handleRemoveItem={handleRemoveItem}
      />

      {showUploadModal && (
        <UploadDocumentModal
          onClose={() => setShowUploadModal(false)}
          docType={docType}
          handleUpload={handleUpload}
          handleRemoveItem={handleRemoveItem}
        />
      )}
    </div>
  )
}

function UploadDocumentBlockTitle({ docType }: UploadDocumentBlockTitleProps) {
  // const { data } = useGetDocumentTypesQuery({})

  // const title = useMemo(() => data?.find((v) => Number(v.id) === docType)?.title || '', [data])

  return (
    <div className="document-block__top">
      <h3 className="document-block__title">{'title'}</h3>
    </div>
  )
}

const UploadDocumentBlockList = memo(function UploadDocumentBlockList({ docType, docList, handleRemoveItem }: UploadDocumentBlockListProps) {
  const current = docList?.filter((v) => v.type === docType)

  return (
    <ul className="document-block__list">
      {current?.map((v) => (
        <UploadDocumentItem
          key={v.id}
          name={v.file}
          type="upload"
          handleRemove={() => handleRemoveItem(v.id)}
        />
      ))}
    </ul>
  )
})
