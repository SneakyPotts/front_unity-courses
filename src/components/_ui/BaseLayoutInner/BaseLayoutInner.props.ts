import type { PropsWithChildren } from 'react'

import type { TAboutMe, TBasketCourse } from '@http/profile/type'

export interface BaseLayoutInnerProps extends PropsWithChildren {
  about?: TAboutMe
  basket?: TBasketCourse[]
}
