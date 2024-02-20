'use server'

import { z } from 'zod'

import { revalidatePath, revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { serverFetch } from '@http/api'

import { schema as schemaSignIn } from '_modals/AuthModal/AuthModal.schema'
import { schema as schemaSignUp } from '_modals/RegisterModal/RegisterModal.schema'

type SignInSchema = z.infer<typeof schemaSignIn>
type SignUpSchema = z.infer<typeof schemaSignUp>

const env = process.env.NODE_ENV

export async function signInServerAction(data: SignInSchema) {
  const response = await serverFetch<{ access: string; refresh: string }>(`/token/`, {
    method: 'POST',
    body: JSON.stringify(data),
  })

  if (response.data) {
    cookies().set('accessToken', response.data.access, {
      path: '/',
      // expires: add(new Date(), { days: 1 }), //TODO: add variable "saveMe"
    })
    revalidateTag('aboutMe')
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

export async function signOutAction() {
  cookies().delete('accessToken')
  revalidateTag('aboutMe')
  revalidatePath('/')
}

export async function signUpServerAction(data: SignUpSchema) {
  return await serverFetch<{ first_name: string; last_name: string }>(`/users/`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}