'use server'

import { revalidateTag } from 'next/cache'

export async function revalidateExam() {
  revalidateTag('studentExam')
}
