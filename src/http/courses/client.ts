import { clientFetch } from '@http/clientApi'
import type { TCourseProgramLight } from '@http/courses/type'
import { useQuery } from '@tanstack/react-query'

const getCourseProgram = (course_id: string) => clientFetch<TCourseProgramLight>(`/courses/${course_id}/topics/`)

export function useQueryCourses({ course_id }: { course_id?: string }) {
  const program = useQuery({
    queryKey: ['program', course_id],
    queryFn: () => getCourseProgram(course_id!),
    enabled: !!course_id,
  })

  return {
    program,
  }
}
