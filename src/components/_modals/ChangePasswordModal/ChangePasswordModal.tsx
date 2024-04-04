import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryProfile } from '@http/profile/client'

import { Button } from '_ui/Button'
import { Field } from '_ui/Field'
import { Modal } from '_ui/Modal'
import { RequestError } from '_ui/RequestError'

import type { ChangePasswordModalProps } from './ChangePasswordModal.props'
import { schema } from './ChangePasswordModal.schema'

type FormSchema = z.infer<typeof schema>

export function ChangePasswordModal({ onClose }: ChangePasswordModalProps) {
  const {
    changePassword: { mutateAsync, isError, error },
  } = useQueryProfile()

  const [successChange, setSuccessChange] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (reqData: any) => {
    console.log('data', reqData)

    mutateAsync(reqData)
      .then(() => setSuccessChange(true))
      .catch((err) => console.log(err))
  }

  return (
    <Modal
      variant={'newPass'}
      title={successChange ? 'Зміна паролю' : 'Створіть новий пароль'}
      tip={successChange ? undefined : 'Ваш новий пароль має відрізнятися від попередніх паролів'}
      onClose={onClose}
    >
      {successChange ? (
        <>
          <p className="modal__text text-center">Ваш пароль успішно змінено</p>
          <Button
            className={'modal__btn'}
            onClick={onClose}
          >
            ОК
          </Button>
        </>
      ) : (
        <form
          className="modal__form"
          id={'newPassword'}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Field
            type={'password'}
            className={'modal__field'}
            placeholder={'Введіть старий пароль'}
            label={'Старий пароль'}
            {...register('old_password')}
            error={errors?.old_password?.message}
          />
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
            form={'newPassword'}
            className={'modal__btn modal__btn--stroke'}
          >
            <svg className="btn__icon">
              <use href="img/sprite.svg#save"></use>
            </svg>
            Змінити пароль
          </Button>
        </form>
      )}
    </Modal>
  )
}
