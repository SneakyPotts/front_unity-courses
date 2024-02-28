import type { TDocument } from '@assets/types/globals'

export interface UploadDocumentModalProps {
  /** Document type (API_URL/users/common/document_types)*/
  docType?: number
  /** Document name */
  docName?: string
  /** Document items list */
  docList?: TDocument[]
  /** Function close upload modal */
  onClose?: () => void
  /** Function upload */
  handleUpload: (doc: FormData) => Promise<TDocument>
  /** Function remove uploaded item */
  handleRemoveItem: (id: string) => void
  /** Function submit upload modal */
  handleSubmit?: () => any
}
