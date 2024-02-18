import React, { type ChangeEventHandler, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import Image from 'next/image'
import Link from 'next/link'

import { zodResolver } from '@hookform/resolvers/zod'
import { SignInServerAction, getGoogleAuthUriAction } from '@http/profile/actions'

import { Button } from '_ui/Button'
import { Checkbox } from '_ui/Checkbox'
import { Field } from '_ui/Field'
import { Modal } from '_ui/Modal'
import { RequestError } from '_ui/RequestError'

import type { AuthModalProps } from './AuthModal.props'
import { schema } from './AuthModal.schema'

type FormSchema = z.infer<typeof schema>

export function AuthModal({ onClose }: AuthModalProps) {
  const error = !!0

  const [saveMe, setSaveMe] = useState(false)

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
    // const { data, error } = await getGoogleAuthUriAction(domain)

    // if (!error && data?.google_auth_uri) {
    //   window.location.href = data?.google_auth_uri
    // }
  }

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    SignInServerAction(data)
      .then(() => {
        onClose()
      })
      .catch(console.log)
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

          {error && <RequestError data={error} />}

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
            Ще не зареєстровані? <Link href={'#'}>Створити аккаунт</Link>
          </p>
        </div>
      </form>
    </Modal>
  )
}
