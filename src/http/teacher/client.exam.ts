import { clientAuthFetch } from '@http/clientApi'
import { revalidateExamInfo } from '@http/teacher/actions'
import { useMutation } from '@tanstack/react-query'

import type { IExamPatch } from './types'

const patchExam = ({ exam_id, ...body }: IExamPatch) =>
  clientAuthFetch<any>(`/courses/teacher/final_test/${exam_id}/`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  })

const setMarkExam = ({ exam_id, user_id, mark, reply }: { exam_id: string; user_id: string; mark: number; reply?: string }) =>
  clientAuthFetch<any>(`/courses/teacher/final_test/${exam_id}/set_mark/`, {
    method: 'POST',
    body: JSON.stringify([{ user_id, mark, reply }]),
  })

const allowRetakeExam = ({ exam_id, student_id }: { exam_id: string; student_id: string }) =>
  clientAuthFetch<any>(`/courses/teacher/final_test/${exam_id}/allow_retake/?student_id=${student_id}`, {
    method: 'PATCH',
  })

export function useQueryTeacherExam() {
  const { mutateAsync: patch } = useMutation({
    mutationFn: patchExam,
    onSuccess: revalidateExamInfo,
  })

  const { mutateAsync: setMark } = useMutation({
    mutationFn: setMarkExam,
    onSuccess: revalidateExamInfo,
  })

  const { mutateAsync: allowRetake } = useMutation({
    mutationFn: allowRetakeExam,
    onSuccess: revalidateExamInfo,
  })

  return {
    patch,
    setMark,
    allowRetake,
  }
}
