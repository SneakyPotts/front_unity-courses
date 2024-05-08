import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryProfile } from '@http/profile/client'

import { Button } from '_ui/Button'
import { Field } from '_ui/Field'
import { Loader } from '_ui/Loader'
import { Modal } from '_ui/Modal'

import type { RecoveryPasswordModalProps } from './RecoveryPasswordModal.props'
import { schema } from './RecoveryPasswordModal.schema'

type FormSchema = z.infer<typeof schema>

export function RecoveryPasswordModal({ onClose }: RecoveryPasswordModalProps) {
  const {
    recoveryPass: { mutateAsync: recovery, isPending, data },
  } = useQueryProfile()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  })

  const [isSuccess, setIsSuccess] = useState(false)

  const onSubmit = (data: any) => {
    console.log('data', data)

    const webhook_url = `${window.location.origin}`

    recovery({ webhook_url, ...data })
      .then(() => setIsSuccess(true))
      .catch(console.error)
  }

  return (
    <Modal
      variant="resetPass"
      title="Відновлення паролю"
      onClose={onClose}
    >
      {isPending && <Loader />}
      {!isPending && !isSuccess && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Field
            type="text"
            {...register('email')}
            label="Пошта"
            placeholder="Ваш email"
            error={errors.email?.message}
          />

          <p className="recovery__desc">
            Введіть електронну адресу, пов’язану з вашим обліковим записом, і ми надішлемо електронний лист із інструкціями щодо зміни вашого пароля.
          </p>

          <Button
            type="submit"
            className="recovery__btn"
          >
            <svg className="btn__icon">
              <use href="/img/sprite.svg#refresh"></use>
            </svg>
            Відновити пароль
          </Button>
        </form>
      )}
      {data && (
        <>
          <p className="recovery__desc">{data.detail}</p>

          <Button
            className="recovery__btn"
            onClick={onClose}
          >
            Ок
          </Button>
        </>
      )}
    </Modal>
  )
}
