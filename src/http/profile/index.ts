import { serverFetchAuth } from '@http/authApi'
import type { TAboutMe } from '@http/profile/type'

export async function AboutMeRequest() {
  return await serverFetchAuth<TAboutMe>('/users/me/', {
    method: 'GET',
    cache: 'reload',
    next: {
      tags: ['aboutMe'],
    },
  })
}
