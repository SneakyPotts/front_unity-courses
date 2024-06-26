import Cookies from 'universal-cookie'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function clientFetch<T>(url: string, init?: RequestInit & { isFile?: boolean }): Promise<T | undefined> {
  const contentType: { 'Content-Type': 'application/json' } | {} = init?.isFile ? {} : { 'Content-Type': 'application/json' }

  const response = await fetch(`${API_URL}${url}`, {
    ...init,
    headers: {
      Accept: 'application/json',
      ...contentType,
      ...init?.headers,
    },
  })

  if (!response.ok) {
    const errorData = await response.json()

    throw new Error(JSON.stringify(errorData.extra.fields), { cause: response })
  }

  return init?.method === 'DELETE' ? undefined : response.json()
}

export async function clientAuthFetch<T>(url: string, init?: RequestInit & { isFile?: boolean }): Promise<T | undefined> {
  const cookies = new Cookies()

  if (!cookies.get('accessToken')) return undefined

  return await clientFetch<T>(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${cookies.get('accessToken')}`,
      ...init?.headers,
    },
  })
}
