import type { TTestResult } from '@assets/types/globals'
import { clientAuthFetch } from '@http/clientApi'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type { TSelfWorkContent, TTestContent } from './types'

const getSelfContent = (self_id: string) => clientAuthFetch<TSelfWorkContent>(`/courses/student/work/${self_id}/`)
const sendTextSelfWorkAnswer = ({ self_id, ...body }: { self_id: string; student_answer: string }) =>
  clientAuthFetch<any>(`/courses/student/work/${self_id}/send_text_answer/`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  })
const sendSelfWorkFile = ({ self_id, body }: { self_id: string; body: FormData }) =>
  clientAuthFetch<any>(`/courses/student/work/${self_id}/file/`, {
    method: 'POST',
    body: body,
    isFile: true,
  })
const deleteSelfWorkFile = ({ self_id, file_id }: { self_id: string; file_id: string }) =>
  clientAuthFetch<any>(`/courses/student/work/${self_id}/file/${file_id}`, {
    method: 'DELETE',
  })
const sendSelfWorkConfirm = ({ self_id }: { self_id: string }) =>
  clientAuthFetch<TSelfWorkContent>(`/courses/student/work/${self_id}/confirm/`, {
    method: 'PATCH',
  })
const getTestContent = (test_id: string) => clientAuthFetch<TTestContent>(`/courses/student/test/${test_id}/`)
const sendTestAnswer = ({ test_id, body }: { test_id: string; body: TTestResult }) =>
  clientAuthFetch<any>(`/courses/student/test/${test_id}/send_answers/`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  })
const confirmExternalTest = ({ test_id }: { test_id: string }) =>
  clientAuthFetch<any>(`/courses/student/test/${test_id}/confirm/`, {
    method: 'PATCH',
  })
const sendIsVisited = ({ lesson_id }: { lesson_id: string }) =>
  clientAuthFetch<any>(`/courses/student/lecture/${lesson_id}/visit/`, {
    method: 'PATCH',
  })

export function useQueryStudentLesson({ self_id, test_id }: { self_id?: string; test_id?: string }) {
  const queryClient = useQueryClient()

  const self = useQuery({
    queryKey: ['selfWork', self_id],
    queryFn: () => getSelfContent(self_id!),
    enabled: !!self_id,
  })

  const { mutateAsync: sendTextSelfWork } = useMutation({
    mutationFn: sendTextSelfWorkAnswer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['selfWork'] }).catch(console.error)
    },
  })

  const { mutateAsync: sendFileSelfWork } = useMutation({
    mutationFn: sendSelfWorkFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['selfWork'] }).catch(console.error)
    },
  })

  const { mutateAsync: deleteFileSelfWork } = useMutation({
    mutationFn: deleteSelfWorkFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['selfWork'] }).catch(console.error)
    },
  })

  const { mutateAsync: sendSelfConfirm } = useMutation({
    mutationFn: sendSelfWorkConfirm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['selfWork'] }).catch(console.error)
    },
  })

  const test = useQuery({
    queryKey: ['test', test_id],
    queryFn: () => getTestContent(test_id!),
    enabled: !!test_id,
  })

  const { mutateAsync: sendTest } = useMutation({
    mutationFn: sendTestAnswer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['test'] }).catch(console.error)
    },
  })

  const { mutateAsync: confirmTest } = useMutation({
    mutationFn: confirmExternalTest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['test'] }).catch(console.error)
    },
  })

  const { mutateAsync: visit } = useMutation({
    mutationFn: sendIsVisited,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lesson'] }).catch(console.error)
    },
  })

  return {
    self,
    sendTextSelfWork,
    sendFileSelfWork,
    deleteFileSelfWork,
    sendSelfConfirm,
    test,
    sendTest,
    confirmTest,
    visit,
  }
}
