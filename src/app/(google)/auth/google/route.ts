import { revalidatePath, revalidateTag } from 'next/cache'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest, NextResponse } from 'next/server'

import { serverFetch } from '@http/api'
import { addToBasketOnAuthAction } from '@http/profile/actions'

const env = process.env.NODE_ENV

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url)

  const code = searchParams.get('code')
  const domain = `${env === 'production' ? 'https://' : 'http://'}${headers().get('host')}`

  const authResponse = await serverFetch<{
    jwt_pair: {
      access: string
      refresh: string
    }
  }>(`/users/oauth/google/authorize/`, {
    method: 'POST',
    body: JSON.stringify({
      code,
      domain,
    }),
  })

  if (!authResponse.error && !!authResponse.data?.jwt_pair.access.length) {
    cookies().set('accessToken', authResponse.data.jwt_pair.access, {
      path: '/',
    })

    await addToBasketOnAuthAction(authResponse.data.jwt_pair.access)

    revalidatePath('/')
    revalidateTag('aboutMe')
    revalidateTag('basket')

    redirect('/home')
  } else {
    console.log('authResponse', authResponse)
    console.log(searchParams)

    return Response.json({ code, domain, response: authResponse })
  }
}
