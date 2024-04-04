import classNames from 'classnames'
import { format, formatISO } from 'date-fns'
import React, { ChangeEventHandler, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { usePopper } from 'react-popper'
import SimpleBar from 'simplebar-react'
import { useOnClickOutside, useToggle } from 'usehooks-ts'

import { DeadlinePicker } from '@components/DeadlinePicker'
import { Portal } from '@components/Portal'
import { useQueryToDo } from '@http/common/todo.client'
import { TToDo } from '@http/profile/type'

import { Button } from '_ui/Button'
import { Checkbox } from '_ui/Checkbox'
import { Loader } from '_ui/Loader'
import { Modal } from '_ui/Modal'
import { toastPromise } from '_ui/ToastUtils'

import type { ToDoItemCreateProps, ToDoItemProps, ToDoListProps } from './ToDoList.props'

export function ToDoList({}: ToDoListProps) {
  const {
    get: { data: toDoList, isLoading, isError },
  } = useQueryToDo()

  const [completedToDo, setCompletedToDo] = useState<TToDo[]>([])
  const [unCompletedToDo, setUnCompletedToDo] = useState<TToDo[]>([])
  const [isCreating, setIsCreating] = useState<string>('')
  const [showMore, setShowMore] = useToggle(true)

  useEffect(() => {
    if (toDoList) {
      setCompletedToDo(toDoList.filter((v) => v.is_completed))
      setUnCompletedToDo(toDoList.filter((v) => !v.is_completed))
    }
  }, [toDoList])

  return (
    <div className="todo__block todo__block--tasks">
      <div className="todo__tasks">
        <div className="todo__top --editing-block">
          <h2 className="todo__title">Задачі</h2>
          {!!isCreating.length ? (
            <div className="todo__edits-controls">
              <Button
                variant="border"
                onClick={() => setIsCreating('')}
              >
                скасувати
              </Button>
              <Button
                type="submit"
                form="todoForm"
              >
                {isCreating === 'create' ? 'додати' : 'зберегти'}
              </Button>
            </div>
          ) : (
            <button
              className="todo__add"
              onClick={() => setIsCreating('create')}
              aria-label="Додати задачу"
            >
              <svg className="todo__add-svg">
                <use href="/img/sprite.svg#plus"></use>
              </svg>
            </button>
          )}
        </div>
        <div className="todo__bottom">
          <SimpleBar
            className="todo__wrapper"
            data-simplebar
          >
            <ul className="todo__list">
              {isCreating === 'create' && <ToDoItemCreate onClose={() => setIsCreating('')} />}

              {isLoading && <Loader />}
              {isError && <p className="text-center">Щось пішло не так</p>}
              {!!unCompletedToDo.length
                ? unCompletedToDo?.map((toDo) => (
                  <ToDoItem
                    key={toDo.id}
                    {...toDo}
                    edit={{ show: isCreating === toDo.id, setShow: () => setIsCreating(toDo.id), setClose: () => setIsCreating('') }}/>))
                : !isLoading && !isCreating.length && <li className="text-center">Список задач пустий...</li>}
            </ul>
          </SimpleBar>
        </div>
      </div>

      {!!completedToDo.length && (
        <div className={classNames('todo__tasks todo__tasks--done', { 'todo__tasks--active': showMore })}>
          <div
            className="todo__top"
            style={{ marginBottom: showMore ? 20 : 0 }}
          >
            <h2 className="todo__title">Виконано</h2>
            <button
              className="todo__add"
              onClick={setShowMore}
              aria-expanded="false"
              aria-label="Відкрити виконані завдання"
            >
              <svg className="todo__add-svg">
                <use href="/img/sprite.svg#arrow-down-mini"></use>
              </svg>
            </button>
          </div>
          <div className="todo__bottom">
            <SimpleBar
              className="todo__wrapper"
              data-simplebar
            >
              <ul className="todo__list">
                {completedToDo?.map((toDo) => (
                  <ToDoItem
                    key={toDo.id}
                    {...toDo}
                    editable={false}
                  />
                ))}
              </ul>
            </SimpleBar>
          </div>
        </div>
      )}
    </div>
  )
}

function ToDoItem({ editable = true, edit, ...todo }: ToDoItemProps) {
  const { edit: editToDo, remove } = useQueryToDo()

  const popperRef = useRef<HTMLDivElement | null>(null)

  const [showControls, setShowControls] = useState(false)
  const [showApproveRemove, setShowApproveRemove] = useState(false)

  const [referenceElement, setReferenceElement] = useState<HTMLLIElement | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null)

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'top-end',
    modifiers: [{ name: 'offset', options: { offset: [0, -55] } }],
  })

  const handleCheck: ChangeEventHandler<HTMLInputElement> = (e) => {
    toastPromise({
      handler: editToDo({ id: todo.id, is_completed: e.target.checked }),
      successMessage: 'Задача успішно збережена',
    })
  }

  const handleRemove = () => {
    toastPromise({
      handler: remove(todo.id),
      successMessage: 'Задача успішно видалена',
    })
  }

  useOnClickOutside(popperRef, () => setShowControls(false))

  if (edit?.show)
    return (
      <ToDoItemCreate
        onClose={() => edit?.setClose()}
        data={todo}
      />
    )

  return (
    <li
      className="todo__item todo-item"
      ref={setReferenceElement}
    >
      <Checkbox
        classWrapper="todo-item__checkbox"
        label={
          <div className="checkbox__todo">
            <div className="checkbox__value">{todo.title}</div>
            {todo.deadline && <div className="checkbox__date date date--blue">{format(new Date(todo.deadline), 'dd.MM HH:mm')}</div>}
          </div>
        }
        onChange={handleCheck as ChangeEventHandler<HTMLInputElement>}
        defaultChecked={todo.is_completed}
        disabled={!editable}
      />
      {editable && (
        <button
          type="button"
          className="todo__edits btn-19"
          onClick={() => setShowControls(true)}
        >
          <span className="todo__edits-span"></span>
          <span className="todo__edits-span"></span>
          <span className="todo__edits-span"></span>
        </button>
      )}

      {showControls && (
        <Portal>
          <div
            className="todo__box"
            ref={(ref) => {
              setPopperElement(ref)
              popperRef.current = ref
            }}
            style={styles.popper}
            {...attributes.popper}
          >
            <button
              type="button"
              className="todo__box-edit"
              onClick={() => {
                edit?.setShow()
                setShowControls(false)
              }}
            >
              <svg className="nav__link-svg">
                <use href="/img/sprite.svg#pensil"></use>
              </svg>
              <p>Змінити</p>
            </button>
            <button
              type="button"
              className="todo__box-edit"
              onClick={() => setShowApproveRemove(true)}
            >
              <svg className="nav__link-svg">
                <use href="/img/sprite.svg#basket"></use>
              </svg>
              <p>Видалити</p>
            </button>
          </div>
        </Portal>
      )}

      {showApproveRemove && (
        <Modal
          title="Ви впевнені, видалити задачу?"
          onClose={() => setShowApproveRemove(false)}
        >
          <div className="modal__wrapper__wants-text">Після видалення цієї задачі, вона буде остаточно видалена з вашого списку завдань та не може бути відновлена.</div>
          <div className="modal__box">
            <Button
              variant="border"
              className="modal__box-btn modal__btn"
              onClick={() => setShowApproveRemove(false)}
            >
              відмінити
            </Button>
            <Button
              className="modal__box-btn modal__btn"
              onClick={handleRemove}
            >
              видалити
            </Button>
          </div>
        </Modal>
      )}
    </li>
  )
}

function ToDoItemCreate({ data, onClose }: ToDoItemCreateProps) {
  const { create, edit } = useQueryToDo()

  const [time, setTime] = useState<Date | undefined>(data?.deadline ? new Date(data.deadline) : undefined)

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<any>({
    values: data,
  })

  const onSubmit = (formData: any, e: any) => {
    if (time) formData.deadline = formatISO(time)

    toastPromise({
      handler: (data ? edit : create)(formData),
      successCallback: () => onClose(),
      successMessage: 'Задача успішно збережена',
    })
  }

  useEffect(() => {
    setFocus('title')
  }, [data, setFocus])

  return (
    <li>
      <form
        id="todoForm"
        className="todo__item todo-item todo-item--create"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Checkbox
          classWrapper="todo-item__checkbox"
          label={
            <div className="checkbox__todo">
              <input
                type="text"
                className="checkbox__field"
                placeholder="Введіть текст..."
                {...register('title')}
              />
              {time && <div className="checkbox__date date date--blue">{format(time, 'dd.MM HH:mm')}</div>}
            </div>
          }
          {...register('is_completed')}
          disabled
        />
        <DeadlinePicker
          customInput={
            <button
              type="button"
              className="checkbox__calendar"
              aria-label="Вiдкрити календар"
            >
              <svg className="checkbox__calendar-svg">
                <use href="/img/sprite.svg#calendar"></use>
              </svg>
            </button>
          }
          onSave={(time) => setTime(time)}
          onClear={() => setTime(undefined)}
        />
      </form>
    </li>
  )
}
