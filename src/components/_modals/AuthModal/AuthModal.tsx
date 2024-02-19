import React, { type ChangeEventHandler, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import Image from 'next/image'
import Link from 'next/link'

import type { ErrorResponse } from '@assets/types/globals'
import { zodResolver } from '@hookform/resolvers/zod'
import { getGoogleAuthUriAction, signInServerAction } from '@http/profile/actions'

import { Button } from '_ui/Button'
import { Checkbox } from '_ui/Checkbox'
import { Field } from '_ui/Field'
import { Modal } from '_ui/Modal'
import { RequestError } from '_ui/RequestError'

import type { AuthModalProps } from './AuthModal.props'
import { schema } from './AuthModal.schema'

type FormSchema = z.infer<typeof schema>

export function AuthModal({ showRegister, onClose }: AuthModalProps) {
  const [saveMe, setSaveMe] = useState(false)
  const [reqError, setReqError] = useState<ErrorResponse | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  })

  const handleSaveMe: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSaveMe(e.target.checked)
  }

  const handleGoogleAuth = async () => {
    const domain = window.location.origin

    await getGoogleAuthUriAction(domain)
  }

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    signInServerAction(data)
      .then((res) => {
        res.error ? setReqError(res.error) : onClose()
      })
      .catch(console.error)
  }

  return (
    <Modal
      variant="signInCourses"
      title={'Вхід'}
      onClose={onClose}
    >
      <form
        className="login__form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="login__form-img">
          <Image
            className="login__form-logo"
            src="/img/aside-logo.svg"
            fill
            alt="alt"
          />
        </div>
        <div className="login__form-inner">
          <Field
            {...register('email')}
            className={'modal__field'}
            type={'text'}
            placeholder={'Ваш email'}
            label={'Пошта'}
            inputMode="email"
            error={errors?.email?.message}
          />
          <Field
            {...register('password')}
            type={'password'}
            className={'modal__field'}
            placeholder={'Ваш пароль'}
            label={'Пароль'}
            error={errors?.password?.message}
          />
          <div className="login__form-bottom">
            <Checkbox
              label={'Запам’ятати мене'}
              onChange={handleSaveMe}
              checked={saveMe}
            />
            <Link
              href={'/auth/forgot-password'}
              className="login__form__bottom-text"
            >
              Забули пароль?
            </Link>
          </div>

          {reqError && <RequestError {...reqError} />}

          <div className="login__form-controls">
            <Button
              className="login__form-btn"
              type="submit"
            >
              <svg className="login__form-svg">
                <use href="/img/sprite.svg#login"></use>
              </svg>
              Увійти
            </Button>

            <span>Або</span>

            <Button
              variant={'border'}
              className="login__form-btn"
              onClick={handleGoogleAuth}
            >
              <Image
                src="/img/icons/google_logo.svg"
                width={20}
                height={20}
                alt="google"
              />
              google
            </Button>
          </div>

          <p className="login__signUp">
            Ще не зареєстровані?{' '}
            <button
              type="button"
              className="to-register"
              onClick={showRegister}
            >
              Створити аккаунт
            </button>
          </p>
        </div>
      </form>
    </Modal>
  )
}
