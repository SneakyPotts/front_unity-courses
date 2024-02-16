import { TToDo } from '@http/profile/type'

export interface ToDoListProps {}
export interface ToDoItemProps extends TToDo {
  editable?: boolean
  edit?: {
    show: boolean
    setShow: () => void
    setClose: () => void
  }
}
export interface ToDoControlsProps {}
export interface ToDoItemCreateProps {
  data?: TToDo
  onClose: () => void
}
