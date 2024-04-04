import { cache } from 'react'

import { serverFetch } from '@http/api'
import { serverFetchAuth } from '@http/authApi'

import type { TAboutMe, TBasket, TCertificateById } from './type'

const aboutMeRequest = cache(
  async () =>
    await serverFetchAuth<TAboutMe>('/users/me/', {
      next: {
        tags: ['aboutMe'],
        revalidate: 30,
      },
    }),
)

const myBasketRequest = cache(
  async () =>
    await serverFetchAuth<TBasket>('/courses/cart/me/', {
      next: {
        tags: ['basket'],
        revalidate: 30,
      },
    }),
)

const getCertificateById = cache(
  async (id: string) =>
    await serverFetch<TCertificateById>(`/courses/certificate/${id}/`, {
      next: {
        revalidate: 30,
      },
    }),
)

export { aboutMeRequest, myBasketRequest, getCertificateById }
