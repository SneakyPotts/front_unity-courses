import type { HTMLProps } from 'react'

import type { TDocument } from '@assets/types/globals'

export interface UploadDocumentProps extends HTMLProps<HTMLInputElement> {
  /** Document type (API_URL/users/common/document_types)*/
  docType?: number
  /** Document items list */
  docList?: TDocument[]
  /** Class name for block wrapper */
  className?: string
  /** Function upload */
  handleUpload: (doc: FormData) => Promise<TDocument>
  /** Function remove uploaded item */
  handleRemoveItem: (id: string) => void
  /** Ability download new files */
  editable?: boolean
}

export interface UploadDocumentBlockTitleProps {
  /** Document type (API_URL/users/common/document_types)*/
  docType: number
}

export interface UploadDocumentBlockListProps {
  /** Document type (API_URL/users/common/document_types)*/
  docType: number
  /** Document items list */
  docList?: TDocument[]
  /** Function remove uploaded item */
  handleRemoveItem: (id: string) => void
}
