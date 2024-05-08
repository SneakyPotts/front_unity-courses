import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useRouter, useSearchParams } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryProfile } from '@http/profile/client'

import { Button } from '_ui/Button'
import { Field } from '_ui/Field'
import { Modal } from '_ui/Modal'
import { RequestError } from '_ui/RequestError'

import type { NewPasswordModalProps } from './NewPasswordModal.props'
import { schema } from './NewPasswordModal.schema'

type FormSchema = z.infer<typeof schema>

export function NewPasswordModal({}: NewPasswordModalProps) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const {
    setPassword: { mutateAsync: setNew, isError, error },
  } = useQueryProfile()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  })

  const [isShowModal, setIsShowModal] = useState(false)

  const handleClose = () => {
    setIsShowModal(false)
    router.replace('/')
  }

  const onSubmit = (data: FormSchema) => {
    console.log('data', data)

    const token = searchParams.get('token')

    if (token) {
      setNew({ new_password: data.new_password, token })
        .then(() => {
          setIsShowModal(false)
          router.replace('/')
        })
        .catch(console.error)
    }
  }

  useEffect(() => {
    if (!!searchParams.get('token')) setIsShowModal(true)
  }, [searchParams])

  if (isShowModal)
    return (
      <Modal
        variant="resetPass"
        title="Створіть новий пароль"
        onClose={handleClose}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Field
            type={'password'}
            className={'modal__field'}
            placeholder={'Введіть новий пароль'}
            label={'Новий пароль'}
            tip={'Має бути не менше 8 символів'}
            {...register('new_password')}
            error={errors?.new_password?.message}
          />
          <Field
            type={'password'}
            className={'modal__field'}
            placeholder={'Повторіть новий пароль'}
            label={'Підтвердження паролю'}
            tip={'Обидва паролі мають збігатися'}
            {...register('confirm_password')}
            error={errors?.confirm_password?.message}
          />

          {isError && <RequestError message={error?.message} />}

          <Button
            type={'submit'}
            className={'modal__btn modal__btn--stroke'}
          >
            <svg className="btn__icon">
              <use href="img/sprite.svg#save"></use>
            </svg>
            Змінити пароль
          </Button>
        </form>
      </Modal>
    )

  return null
}
