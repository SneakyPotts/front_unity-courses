const API_URL = process.env.NEXT_PUBLIC_API_URL
async function signInByGoogle(domain: string) {
  const response = await fetch(`${API_URL}/users/oauth/google/get_uri/`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ domain }),
  })

  const result = await response.json()

  console.log('result', result)

  return result
}
