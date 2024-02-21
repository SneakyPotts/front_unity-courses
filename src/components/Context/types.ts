import type { Dispatch, SetStateAction } from 'react'

import type { TAboutMe, TBasketCourse } from '@http/profile/type'

export interface IContext {
  asideIsOpen?: boolean
  handleSetAsideIsOpen?: () => void
  header?: THeader
  setHeader: (args: THeader) => void
  profile?: TAboutMe
  setProfile: (profile?: TAboutMe) => void
  basket?: TBasketCourse[]
  setBasket: Dispatch<SetStateAction<TBasketCourse[] | undefined>>
}

export type THeader = {
  title: string
}
