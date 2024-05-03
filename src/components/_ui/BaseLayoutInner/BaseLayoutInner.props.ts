import type { PropsWithChildren } from 'react'

import type { TAboutMe, TBasketCourse } from '@http/profile/type'
import { TWishList } from '@http/student/types'

export interface BaseLayoutInnerProps extends PropsWithChildren {
  about?: TAboutMe
  basket?: TBasketCourse[]
  wishlist?: TWishList
}
