import type { HTMLProps } from 'react'

import type { TAboutMe, TBasketCourse } from '@/http/profile/type'

export interface HeaderProps extends HTMLProps<HTMLElement> {
  profile?: TAboutMe
}
