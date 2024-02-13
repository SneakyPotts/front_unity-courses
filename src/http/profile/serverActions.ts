'use server'

import { z } from 'zod'

import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

import { schema } from '@components/Header/SignIn.schema'

import { serverFetch } from '@http/api'

type FormSchema = z.infer<typeof schema>

export async function SignInServerAction(data: FormSchema) {
  const response = await serverFetch<{ access: string; refresh: string }>(`/token/`, {
    method: 'POST',
    // headers: {
    //   'Content-Type': 'application/json',
    // },
    body: JSON.stringify(data),
  })

  console.log(SignInServerAction, response)

  if (response.data) {
    cookies().set('accessToken', response.data.access)
    revalidateTag('aboutMe')
  }

  return response
}

export async function SignOutAction() {
  cookies().delete('accessToken')
  revalidateTag('aboutMe')
  // revalidatePath('(site)/', 'layout')
}
