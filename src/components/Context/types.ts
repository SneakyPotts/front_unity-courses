import type { TAboutMe } from '@http/profile/type'

export interface IContext {
  asideIsOpen?: boolean
  handleSetAsideIsOpen?: () => void
  header?: THeader
  setHeader: (args: THeader) => void
  profile?: TAboutMe
  setProfile: (profile?: TAboutMe) => void
}

export type THeader = {
  title: string
}
