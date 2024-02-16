import type { TAboutMe } from '@http/profile/type'

export interface ProfilePopupProps {
  profile?: TAboutMe
  showProfileModal: () => void
  onClose: () => void
}
