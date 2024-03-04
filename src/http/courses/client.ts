import type { TTestResult } from '@assets/types/globals'
import { clientAuthFetch } from '@http/clientApi'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type { TCourseDetail, TLessonContent, TReviewItem, TSelfWorkContent, TTestContent } from './type'

const getCourseInfo = (course_id: string) => clientAuthFetch<TCourseDetail>(`/courses/${course_id}/`)

const getLessonContent = (lesson_id: string) => clientAuthFetch<TLessonContent>(`/courses/student/lecture/${lesson_id}/`)
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

const sendIsVisited = ({ lesson_id }: { lesson_id: string }) =>
  clientAuthFetch<any>(`/courses/student/lecture/${lesson_id}/visit/`, {
    method: 'PATCH',
  })

const sendNewReview = ({ course_id, ...data }: { course_id: string; rating: string | number; content: string }) =>
  clientAuthFetch<TReviewItem>(`/courses/${course_id}/reviews/add/`, {
    method: 'POST',
    body: JSON.stringify(data),
  })

export function useQueryStudentLesson({ course_id, lesson_id, test_id, self_id }: { course_id?: string; lesson_id?: string; test_id?: string; self_id?: string }) {
  const queryClient = useQueryClient()

  const course = useQuery({
    queryKey: [course_id],
    queryFn: () => getCourseInfo(course_id!),
    enabled: !!course_id,
  })

  const content = useQuery({
    queryKey: ['lesson', lesson_id],
    queryFn: () => getLessonContent(lesson_id!),
    enabled: !!lesson_id,
  })

  const self = useQuery({
    queryKey: ['selfWork', self_id],
    queryFn: () => getSelfContent(self_id!),
    enabled: !!self_id,
  })

  const { mutateAsync: sendTextSelfWork } = useMutation({
    mutationFn: sendTextSelfWorkAnswer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['selfWork'] })
    },
  })

  const { mutateAsync: sendFileSelfWork } = useMutation({
    mutationFn: sendSelfWorkFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['selfWork'] })
    },
  })

  const { mutateAsync: deleteFileSelfWork } = useMutation({
    mutationFn: deleteSelfWorkFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['selfWork'] })
    },
  })

  const { mutateAsync: sendSelfConfirm } = useMutation({
    mutationFn: sendSelfWorkConfirm,
  })

  const test = useQuery({
    queryKey: ['test', test_id],
    queryFn: () => getTestContent(test_id!),
    enabled: !!test_id,
  })

  const { mutateAsync: sendTest } = useMutation({
    mutationFn: sendTestAnswer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['test'] })
    },
  })

  const { mutateAsync: visit } = useMutation({
    mutationFn: sendIsVisited,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lesson'] })
    },
  })

  const { mutateAsync: addReview } = useMutation({
    mutationFn: sendNewReview,
  })

  return {
    course,
    content,
    self,
    sendTextSelfWork,
    sendFileSelfWork,
    deleteFileSelfWork,
    sendSelfConfirm,
    test,
    sendTest,
    visit,
    addReview,
  }
}
