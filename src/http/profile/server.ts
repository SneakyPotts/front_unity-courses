import { cache } from 'react'

import { serverFetchAuth } from '@http/authApi'
import { TAboutMe, TBasket } from '@http/profile/type'

const aboutMeRequest = cache(
  async () =>
    await serverFetchAuth<TAboutMe>('/users/me/', {
      cache: 'reload',
      next: {
        tags: ['aboutMe'],
      },
    }),
)

const myBasketRequest = cache(
  async () =>
    await serverFetchAuth<TBasket>('/courses/cart/me/', {
      cache: 'reload',
      next: {
        tags: ['basket'],
      },
    }),
)

export { aboutMeRequest, myBasketRequest }
