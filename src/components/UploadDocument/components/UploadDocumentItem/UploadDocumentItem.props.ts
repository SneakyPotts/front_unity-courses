export interface UploadDocumentItemProps {
  /** Document name */
  name: string
  /** Type document item */
  type: 'download' | 'upload'
  /** Function remove uploaded item */
  handleRemove?: () => void
  /** Download link for document type "upload" */
  link?: string
  /** File size for uploading preview item */
  fileSize?: number
  /** Uploading state status - pending */
  onLoading?: boolean
  /** Uploading state status - fulfilled */
  isLoaded?: boolean
  /** Uploading state status - rejected */
  isError?: boolean
}
