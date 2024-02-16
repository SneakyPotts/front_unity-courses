import type { PropsWithChildren } from 'react'

import type { TAboutMe } from '@http/profile/type'

export interface BaseLayoutInnerProps extends PropsWithChildren {
  about?: TAboutMe
}
