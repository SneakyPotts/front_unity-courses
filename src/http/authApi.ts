import { cookies } from 'next/headers'

import type { ErrorResponse } from '@assets/types/globals'
import { serverFetch } from '@http/api'

export async function serverFetchAuth<T>(url: string, init?: RequestInit & { skip?: boolean }): Promise<{ data: T | undefined; error: ErrorResponse | null }> {
  const token = cookies().get('')?.value

  return await serverFetch<T>(url, {
    ...init,
    skip: !token,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
