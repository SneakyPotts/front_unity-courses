import type { TPageProps } from '@assets/types/globals'
import { getLessonContent } from '@http/courses/server'

import { RequestError } from '_ui/RequestError'

import { LessonPageContent } from '_content/LessonPageContent'

export default async function LessonPage({ params }: TPageProps) {
  const { data, error } = await getLessonContent(params.lesson_id as string)

  if (error) return <RequestError message={error.message || 'Щось пішло не так...'} />

  return <LessonPageContent data={data} />
}
