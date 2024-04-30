import type { TTestResult } from '@assets/types/globals'
import { clientAuthFetch } from '@http/clientApi'
import { useMutation } from '@tanstack/react-query'

import { revalidateExam } from './actions'

const sendTextExamAnswer = ({ exam_id, ...body }: { exam_id: string; answer: string }) =>
  clientAuthFetch<any>(`/courses/student/final_test/${exam_id}/send_answers/`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  })

const sendQuizExamAnswer = ({ test_id, body }: { test_id: string; body: TTestResult }) =>
  clientAuthFetch<any>(`/courses/student/final_test/${test_id}/quiz/send_answers/`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  })

const addExamFile = ({ exam_id, body }: { exam_id: string; body: FormData }) =>
  clientAuthFetch<any>(`/courses/student/final_test/${exam_id}/file/add/`, {
    method: 'POST',
    body: body,
    isFile: true,
  })

const removeExamFile = ({ exam_id, file_id }: { exam_id: string; file_id: string }) =>
  clientAuthFetch<any>(`/courses/student/final_test/${exam_id}/file/${file_id}/`, {
    method: 'DELETE',
  })

const examConfirm = ({ exam_id }: { exam_id: string }) =>
  clientAuthFetch<any>(`/courses/student/final_test/${exam_id}/confirm/`, {
    method: 'PATCH',
  })

export function useQueryStudentExam() {
  const { mutateAsync: sendTextExam } = useMutation({
    mutationFn: sendTextExamAnswer,
    onSuccess: () => {
      revalidateExam().catch(console.error)
    },
  })

  const { mutateAsync: sendQuizExam } = useMutation({
    mutationFn: sendQuizExamAnswer,
    onSuccess: () => {
      revalidateExam().catch(console.error)
    },
  })

  const { mutateAsync: addFile } = useMutation({
    mutationFn: addExamFile,
    onSuccess: () => {
      revalidateExam().catch(console.error)
    },
  })

  const { mutateAsync: removeFile } = useMutation({
    mutationFn: removeExamFile,
    onSuccess: () => {
      revalidateExam().catch(console.error)
    },
  })

  const { mutateAsync: confirmExam } = useMutation({
    mutationFn: examConfirm,
    onSuccess: () => {
      revalidateExam().catch(console.error)
    },
  })

  return {
    sendTextExam,
    sendQuizExam,
    addFile,
    removeFile,
    confirmExam,
  }
}
