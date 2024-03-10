'use server'

import { revalidateTag } from 'next/cache'

export async function revalidateSelfWork() {
  revalidateTag('selfProgress')
}

export async function revalidateTestWork() {
  revalidateTag('testProgress')
}
