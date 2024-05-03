'use server'

import { z } from 'zod'

import { revalidatePath, revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { serverFetch } from '@http/api'
import { serverFetchAuth } from '@http/authApi'

import { schema as schemaSignIn } from '_modals/AuthModal/AuthModal.schema'
import { schema as schemaSignUp } from '_modals/RegisterModal/RegisterModal.schema'

import type { TBasket } from './type'

type SignInSchema = z.infer<typeof schemaSignIn>
type SignUpSchema = z.infer<typeof schemaSignUp>

const env = process.env.NODE_ENV

export async function signInServerAction(data: SignInSchema) {
  const response = await serverFetch<{ access: string; refresh: string }>(`/token/`, {
    method: 'POST',
    body: JSON.stringify(data),
  })

  if (!!response.data) {
    await signInAction(response.data.access, response.data.refresh)

    await addToBasketOnAuthAction(response.data.access)
  }

  return response
}

export async function getGoogleAuthUriAction(domain: string) {
  const domainUrl = encodeURI(env === 'production' ? domain : 'http://127.0.0.1:3000')

  const result = await serverFetch<{ google_auth_uri: string }>(`/users/oauth/google/get_uri/?domain=${domainUrl}`)

  if (result?.data?.google_auth_uri && !result?.error) {
    redirect(result?.data?.google_auth_uri)
  }
}

export async function signInAction(access: string, refresh: string) {
  cookies().set('accessToken', access, { path: '/' })
  cookies().set('refreshToken', refresh, { path: '/' })

  revalidateTag('aboutMe')
  revalidateTag('basket')
  revalidatePath('/')
}

export async function signOutAction() {
  cookies().delete('accessToken')
  cookies().delete('refreshToken')

  revalidateTag('aboutMe')
  revalidateTag('basket')
  revalidatePath('/')
}

export async function signUpServerAction(data: SignUpSchema) {
  return await serverFetch<{ first_name: string; last_name: string }>(`/users/`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function addToBasketAction(course_id: string) {
  const response = await serverFetchAuth<TBasket>(`/courses/cart/add/`, {
    method: 'POST',
    body: JSON.stringify({ id: course_id }),
  })

  if (!response.error) {
    revalidateTag('wishlist')
  }
}

export async function patchParentBasket(data: { course_id: string; user_ids: string[] }) {
  const response = await serverFetchAuth<any>(`/courses/cart/edit/`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })

  revalidateTag('basket')

  return response
}

export async function removeFromBasketAction(course_id: string) {
  return await serverFetchAuth<TBasket>(`/courses/cart/remove/`, {
    method: 'POST',
    body: JSON.stringify({ id: course_id }),
  })
}

export async function addToBasketOnAuthAction(token: string) {
  const localBasket = cookies().get('basket')?.value

  if (!!localBasket?.length) {
    localBasket.split(',').forEach((course_id) => {
      serverFetch('/courses/cart/add/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'POST',
        body: JSON.stringify({ id: course_id }),
      })
    })
  }

  cookies().delete('basket')
}

export async function buyByLiqPay() {
  return await serverFetchAuth<{
    data: string
    signature: string
    status: string
  }>(`/courses/cart/liqpay/init/`)
}

export async function revalidateCourses() {
  revalidateTag('catalog')
  revalidateTag('courseDetail')
}

export async function revalidateProfile() {
  revalidateTag('aboutMe')
}
