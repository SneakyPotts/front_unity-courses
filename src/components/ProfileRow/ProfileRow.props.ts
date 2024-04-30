import type { TProfile } from '@http/profile/type'

export interface ProfileRowProps {
  label: string
  name: keyof TProfile | 'password'
  editable?: boolean
}
