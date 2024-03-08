import { clientAuthFetch } from '@http/clientApi'
import { useQuery } from '@tanstack/react-query'

import type { TTeacherSelfWork } from './types'

const getSelfContent = (self_id: string) => clientAuthFetch<TTeacherSelfWork>(`/courses/teacher/work/${self_id}/`)

export function useQueryTeacherLesson({ self_id, test_id }: { self_id?: string; test_id?: string }) {
  // const queryClient = useQueryClient()

  const self = useQuery({
    queryKey: ['selfWork', self_id],
    queryFn: () => getSelfContent(self_id!),
    enabled: !!self_id,
  })

  // const { mutateAsync: sendTextSelfWork } = useMutation({
  //   mutationFn: sendTextSelfWorkAnswer,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['selfWork'] })
  //   },
  // })

  return {
    self,
  }
}
