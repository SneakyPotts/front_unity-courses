import { cookies } from 'next/headers'

import { serverFetch } from '@http/api'

const API_URL = process.env.NEXT_PUBLIC_API_URL

// export async function serverFetchAuth<T>(url: string, init?: RequestInit & { skip?: boolean }): Promise<T | undefined> {
//   if (init?.skip) return undefined
//
//   try {
//     const response = await fetch(`${API_URL}${url}`, {
//       ...init,
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//         Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
//       },
//     })
//
//     return response.json()
//   } catch (error) {
//     console.log(error)
//     throw error
//   }
// }
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
