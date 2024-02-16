import { cache } from 'react'

import { serverFetchAuth } from '@http/authApi'
import type { TAboutMe } from '@http/profile/type'

const AboutMeRequest = cache(
  async () =>
    await serverFetchAuth<TAboutMe>('/users/me/', {
      cache: 'reload',
      next: {
        tags: ['aboutMe'],
      },
    }),
)

export { AboutMeRequest }
