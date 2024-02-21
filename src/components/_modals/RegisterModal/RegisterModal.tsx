import React, { type ChangeEvent, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import Image from 'next/image'
import Link from 'next/link'

import { zodResolver } from '@hookform/resolvers/zod'
import { getGoogleAuthUriAction, signUpServerAction } from '@http/profile/actions'

import { Button } from '_ui/Button'
import { Checkbox } from '_ui/Checkbox'
import { Field } from '_ui/Field'
import { Modal } from '_ui/Modal'
import { successIcon } from '_ui/ToastUtils'

import type { RegisterModalProps } from './RegisterModal.props'
import { schema } from './RegisterModal.schema'

type FormSchema = z.infer<typeof schema>

export function RegisterModal({ showAuth, onClose }: RegisterModalProps) {
  const [isTermsChecked, setIsTermsChecked] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    signUpServerAction(data)
      .then((res) => {
        if (!res.error && res.data) {
          toast.success(`Користувач ${res.data.last_name} ${res.data.first_name} успішно зареєстрований.`, { ...successIcon })
          showAuth()
        }
      })
      .catch(console.error)
  }

  const handleSignUpByGoogle = async () => {
    const domain = window.location.origin

    await getGoogleAuthUriAction(domain)
  }

  return (
    <Modal
      variant="signUpCourses"
      title="register"
      onClose={onClose}
    >
      <div className="signUp__left">
        <div className="signUp__logo">
          <Image
            className="signUp__logo-img"
            src="/img/aside-logo.svg"
            fill
            alt="Unity courses logo"
          />
        </div>

        <p className="signUp__desc-title">Розкрийте свій потенціал</p>
        <p className="signUp__desc-text">
          Ласкаво просимо в світ безмежних можливостей та освіти! Наша платформа пропонує вам вибір із найкращих онлайн курсів, розроблених експертами у різних галузях.
        </p>
      </div>
      <div className="signUp__right">
        <div className="signUp__right-inner">
          <form
            className="signUp__form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="signUp__form-title">Реєстрація</h2>

            <div className="double signUp__form-row">
              <Field
                {...register('first_name')}
                type={'text'}
                label={'Ім’я'}
                placeholder={'Введіть ім’я'}
                error={errors?.first_name?.message}
              />
              <Field
                {...register('last_name')}
                type={'text'}
                label={'Прізвище'}
                placeholder={'Введіть прізвище'}
                error={errors?.last_name?.message}
              />
            </div>

            <Field
              {...register('email')}
              type={'text'}
              className="signUp__form-row"
              label={'Пошта'}
              placeholder={'Введіть пошту'}
              error={errors?.email?.message}
            />

            <Field
              {...register('password')}
              type={'password'}
              className="signUp__form-row"
              label={'Пароль'}
              placeholder={'Введіть пароль'}
              error={errors?.password?.message}
            />

            <Field
              {...register('confirm_password')}
              type={'password'}
              className="signUp__form-row"
              label={'Підтвердити пароль'}
              placeholder={'Введіть пароль'}
              error={errors?.confirm_password?.message}
            />

            <Checkbox
              classWrapper="signUp__terms"
              defaultChecked={isTermsChecked}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setIsTermsChecked(e.target.checked)}
              label={
                <>
                  <span>Я приймаю</span>{' '}
                  <Link
                    href="#"
                    className="signUp__terms-link"
                  >
                    Умови надання послуг
                  </Link>
                  , а також{' '}
                  <Link
                    href="#"
                    className="signUp__terms-link"
                  >
                    Політику конфіденційності
                  </Link>
                </>
              }
            />

            <div className="signUp__controls">
              <Button
                type="submit"
                className="signUp__controls-btn"
                disabled={!isTermsChecked}
              >
                <svg className="btn__icon">
                  <use href="/img/sprite.svg#check"></use>
                </svg>
                Зареєструватися
              </Button>
              <span>Або</span>
              <Button
                variant="border"
                className="signUp__controls-btn"
                onClick={handleSignUpByGoogle}
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

            <p className="signUp__switch">
              Вже є аккаунт?{' '}
              <button
                type="button"
                className="to-auth"
                onClick={showAuth}
              >
                Увійдіть зараз
              </button>
            </p>
          </form>
        </div>
      </div>
    </Modal>
  )
}
