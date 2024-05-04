'use server'

import { revalidateTag } from 'next/cache'

import { serverFetchAuth } from '@http/authApi'

export async function revalidateExam() {
  revalidateTag('studentExam')
}

export async function addToWishlist(id: string) {
  const response = await serverFetchAuth<any>(`/courses/favorites/add/`, {
    method: 'POST',
    body: JSON.stringify({ id }),
  })

  if (!response.error) {
    revalidateTag('wishlist')
  }
}

export async function removeFromWishlist(id: string) {
  const response = await serverFetchAuth<any>(`/courses/favorites/remove/`, {
    method: 'POST',
    body: JSON.stringify({ id }),
  })

  if (!response.error) {
    revalidateTag('wishlist')
  }
}
