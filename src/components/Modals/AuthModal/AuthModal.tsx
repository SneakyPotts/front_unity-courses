'use client'

import React, { ChangeEventHandler, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@UI/Button'
import { Checkbox } from '@UI/Checkbox'
import { Field } from '@UI/Field'
import { Modal } from '@UI/Modal'
import { RequestError } from '@UI/RequestError'

import { zodResolver } from '@hookform/resolvers/zod'
import { SignInServerAction } from '@http/profile/serverActions'

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
              className="login__form-btn"
              variant={'border'}
            >
              <svg className="login__form-svg">
                <use href="/img/sprite.svg#login"></use>
              </svg>
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
