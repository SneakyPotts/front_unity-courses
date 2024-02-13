const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function serverFetch<T>(url: string, init?: RequestInit & { skip?: boolean }): Promise<{ data: T | undefined; error: Error | null }> {
  if (init?.skip)
    return {
      data: undefined,
      error: null,
    }

  try {
    const res = await fetch(`${API_URL}${url}`, {
      ...init,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...init?.headers,
      },
    })

    if (!res.ok) {
      return { data: undefined, error: new Error(`Failed to fetch data with status: ${res.status} ${res.statusText}`) }
    }

    const response = await res.json()

    return { data: response as T, error: null }
  } catch (error) {
    console.log(error)
    return { data: undefined, error: new Error(error as string) }
  }
}
