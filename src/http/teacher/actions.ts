'use server'

import { revalidateTag } from 'next/cache'

export async function revalidateSelfWork() {
  revalidateTag('selfProgress')
}

export async function revalidateTestWork() {
  revalidateTag('testProgress')
}

export async function revalidateExamInfo() {
  revalidateTag('teacherExam')
}

export async function revalidateExamCheckInfo() {
  revalidateTag('examProgress')
}
