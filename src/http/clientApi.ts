import Cookies from 'universal-cookie'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function clientFetch<T>(url: string, init?: RequestInit): Promise<T | undefined> {
  const response = await fetch(`${API_URL}${url}`, {
    ...init,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  })

  return response.json()
}

export async function clientAuthFetch<T>(url: string, init?: RequestInit): Promise<T | undefined> {
  const cookies = new Cookies()

  if (!cookies.get('accessToken')) return undefined

  const response = await clientFetch<T>(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${cookies.get('accessToken')}`,
    },
  })

  // const response = await fetch(`${API_URL}${url}`, {
  //   ...init,
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${cookies.get('accessToken')}`,
  //   },
  // })

  return init?.method === 'DELETE' ? undefined : response
}
