import { clientAuthFetch } from '@http/clientApi'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { TTeacherSelfWork, TTeacherTestWork } from './types'

const getSelfContent = (self_id: string) => clientAuthFetch<TTeacherSelfWork>(`/courses/teacher/work/${self_id}/`)
const patchSelfWork = ({ self_id, ...body }: { self_id: string; deadline: string }) =>
  clientAuthFetch<TTeacherSelfWork>(`/courses/teacher/work/${self_id}/`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  })

const getTestContent = (test_id: string) => clientAuthFetch<TTeacherTestWork>(`/courses/teacher/test/${test_id}/`)

const patchTestWork = ({ test_id, ...body }: { test_id: string; deadline?: string; external_link?: string }) =>
  clientAuthFetch<TTeacherTestWork>(`/courses/teacher/test/${test_id}/`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  })

const setTestMark = ({ test_id, ...body }: { test_id: string; user_id: string; mark: number; reply?: string }) =>
  clientAuthFetch<TTeacherTestWork>(`/courses/teacher/test/${test_id}/set_mark/`, {
    method: 'POST',
    body: JSON.stringify([body]),
  })

const allowRetakeTest = ({ test_id, student_id }: { test_id: string; student_id: string }) =>
  clientAuthFetch<TTeacherTestWork>(`/courses/teacher/test/${test_id}/allow_retake/?student_id=${student_id}`, {
    method: 'PATCH',
  })

export function useQueryTeacherLesson({ self_id, test_id }: { self_id?: string; test_id?: string }) {
  const queryClient = useQueryClient()

  const self = useQuery({
    queryKey: ['teacher_self', self_id],
    queryFn: () => getSelfContent(self_id!),
    enabled: !!self_id,
  })

  const { mutateAsync: editSelf } = useMutation({
    mutationFn: patchSelfWork,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacher_self'] })
    },
  })

  const test = useQuery({
    queryKey: ['teacher_test', test_id],
    queryFn: () => getTestContent(test_id!),
    enabled: !!test_id,
  })

  const { mutateAsync: editTest } = useMutation({
    mutationFn: patchTestWork,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacher_test'] })
    },
  })
  const { mutateAsync: testMark } = useMutation({
    mutationFn: setTestMark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacher_test'] })
    },
  })
  const { mutateAsync: retakeTest } = useMutation({
    mutationFn: allowRetakeTest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacher_test'] })
    },
  })

  return {
    self,
    editSelf,
    test,
    editTest,
    testMark,
    retakeTest,
  }
}
