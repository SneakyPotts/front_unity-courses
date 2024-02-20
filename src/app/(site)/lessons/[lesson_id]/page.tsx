import type { TPageProps } from '@assets/types/globals'

export default function LessonPage({ params }: TPageProps) {
  return (
    <div>
      <h1>Lesson Page, id = {params.lesson_id}</h1>
    </div>
  )
}
