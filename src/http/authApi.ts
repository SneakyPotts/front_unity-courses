import { cookies } from 'next/headers'

import { serverFetch } from '@http/api'

export async function serverFetchAuth<T>(url: string, init?: RequestInit & { skip?: boolean }): Promise<{ data: T | undefined; error: Error | null }> {
  const token = cookies().get('accessToken')?.value

  return await serverFetch<T>(url, {
    ...init,
    skip: !token,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
