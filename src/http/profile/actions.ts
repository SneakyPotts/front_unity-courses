'use server'

import { z } from 'zod'

import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

import { serverFetch } from '@http/api'

import { schema } from '_modals/AuthModal/AuthModal.schema'

type FormSchema = z.infer<typeof schema>

export async function SignInServerAction(data: FormSchema) {
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

export async function SignOutAction() {
  cookies().delete('accessToken')
  revalidateTag('aboutMe')
  // revalidatePath('(site)/', 'layout')
}

export async function InvalidateByTag(tag: string) {
  revalidateTag(tag)
}

export async function InvalidateToDo() {
  revalidateTag('todoList')
}
