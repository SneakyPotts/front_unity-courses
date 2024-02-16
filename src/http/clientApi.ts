import Cookies from 'universal-cookie'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function clientAuthFetch<T>(url: string, init?: RequestInit): Promise<T | undefined> {
  const cookies = new Cookies(null, { path: '/' })

  const response = await fetch(`${API_URL}${url}`, {
    ...init,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookies.get('accessToken')}`,
    },
  })

  return init?.method === 'DELETE' ? undefined : response.json()
}
