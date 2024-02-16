import { clientAuthFetch } from '@http/clientApi'
import type { TToDo } from '@http/profile/type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const getToDoList = () => clientAuthFetch<TToDo[]>(`/todo/`)

const createToDo = (body: { title: string; deadline?: string; is_completed?: boolean }) =>
  clientAuthFetch<any>(`/todo/`, {
    method: 'POST',
    body: JSON.stringify(body),
  })

const updateToDo = ({ id, ...body }: { id: string; title?: string; deadline?: string; is_completed?: boolean }) =>
  clientAuthFetch<any>(`/todo/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  })

const removeToDo = (id: string) =>
  clientAuthFetch<any>(`/todo/${id}/`, {
    method: 'DELETE',
  })

export function useQueryToDo() {
  const queryClient = useQueryClient()

  const get = useQuery({
    queryKey: ['ToDoList'],
    queryFn: getToDoList,
  })

  const { mutateAsync: create } = useMutation({
    mutationFn: createToDo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ToDoList'] })
    },
  })

  const { mutateAsync: edit } = useMutation({
    mutationFn: updateToDo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ToDoList'] })
    },
  })

  const { mutateAsync: remove } = useMutation({
    mutationFn: removeToDo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ToDoList'] })
    },
  })

  return {
    get,
    create,
    edit,
    remove,
  }
}
