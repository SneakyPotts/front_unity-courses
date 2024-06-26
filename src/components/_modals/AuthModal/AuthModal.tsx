import classNames from 'classnames'
import React, { type ChangeEventHandler, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { useLocalStorage } from 'usehooks-ts'
import { z } from 'zod'

import Image from 'next/image'

import type { ErrorResponse } from '@assets/types/globals'
import { zodResolver } from '@hookform/resolvers/zod'
import { getGoogleAuthUriAction, signInServerAction } from '@http/profile/actions'
import { TBasketCourse } from '@http/profile/type'

import { Button } from '_ui/Button'
import { Checkbox } from '_ui/Checkbox'
import { Field } from '_ui/Field'
import { Modal } from '_ui/Modal'
import { RequestError } from '_ui/RequestError'

import { AuthFormProps, AuthModalProps } from './AuthModal.props'
import { schema } from './AuthModal.schema'

type FormSchema = z.infer<typeof schema>

export function AuthModal({ onClose, ...props }: AuthModalProps) {
  return (
    <Modal
      variant="signInCourses"
      title={'Вхід'}
      onClose={onClose}
    >
      <AuthForm
        onClose={onClose}
        {...props}
      />
    </Modal>
  )
}

export function AuthForm({ onClose, showRegister, showRecoveryPass, showRegisterBasket, isBasket }: AuthFormProps) {
  const [_, setBasketLocal] = useLocalStorage<TBasketCourse[] | null>('basket', null, { serializer: JSON.stringify, deserializer: JSON.parse })

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

    setBasketLocal(null)
  }

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    signInServerAction(data)
      .then((res) => {
        res.error ? setReqError(res.error) : onClose && onClose()

        setBasketLocal(null)
      })
      .catch(console.error)
  }

  return (
    <form
      className="login__form"
      onSubmit={handleSubmit(onSubmit)}
    >
      {!isBasket && (
        <div className="login__form-img">
          <Image
            className="login__form-logo"
            src="/img/aside-logo.svg"
            fill
            alt="alt"
          />
        </div>
      )}
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
          <button
            type="button"
            className="login__form-bottom__text"
            onClick={showRecoveryPass}
          >
            Забули пароль?
          </button>
        </div>

        {reqError && <RequestError {...reqError} />}

        <div className="login__form-controls">
          <Button
            variant={isBasket ? 'border' : 'accent'}
            className={classNames('login__form-btn', { '--is-basket': isBasket })}
            type="submit"
          >
            <svg className={isBasket ? 'btn__icon' : 'login__form-svg'}>
              <use href="/img/sprite.svg#login"></use>
            </svg>
            Увійти
          </Button>

          <span>Або</span>

          {isBasket ? (
            <Button
              className="login__form-btn"
              onClick={showRegisterBasket}
            >
              <svg className={'btn__icon'}>
                <use href="/img/sprite.svg#check"></use>
              </svg>
              Зареєструватися
            </Button>
          ) : (
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
          )}
        </div>

        {!isBasket && (
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
        )}
      </div>
    </form>
  )
}
