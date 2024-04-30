export interface UploadAvatarProps {
  /** User ID,  avatar */
  userID?: string
  /** URL avatar image */
  avatar?: string
  /** Text for <img /> attr alt="" */
  alt?: string
  /** Text warning message */
  warn?: string
  /** Extra class for wrapper */
  className?: string
  /** Alternative request */
  externalRequest?: (formData: FormData) => Promise<any>
  /** Ability edit avatar */
  editable?: boolean
}

export interface UploadAvatarModalProps {
  /** User ID,  avatar */
  userID?: string
  /** Close upload modal function */
  onClose: () => void
  /** Alternative request */
  externalRequest?: (formData: FormData) => Promise<any>
}
