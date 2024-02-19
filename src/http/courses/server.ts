import { cache } from 'react'

import { serverFetch } from '@http/api'
import { TCatalog } from '@http/courses/type'

const getCoursesCatalog = cache(
  async () =>
    await serverFetch<TCatalog>('/courses/', {
      next: {
        revalidate: 0,
      },
    }),
)

export { getCoursesCatalog }
