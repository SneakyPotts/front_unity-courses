'use client'

import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'

import Image from 'next/image'
import Link from 'next/link'

import { imgBlur } from '@assets/utils'
import { appContext } from '@components/Context/context'
import { ProfileRow } from '@components/ProfileRow'
import { Textarea } from '@components/Textarea'
import { UploadAvatar } from '@components/UploadAvatar'
import { useSetHeaderParams } from '@hooks/useSetHeaderParams'
import { useQueryProfile } from '@http/profile/client'
import { useQueryCertificates } from '@http/profile/client.certificates'
import { TAboutMe } from '@http/profile/type'

import { AppPagination } from '_ui/AppPagination'
import { Button } from '_ui/Button'
import { Field } from '_ui/Field'
import { Loader } from '_ui/Loader'
import { PageWrapper } from '_ui/PageWrapper'
import { RequestError } from '_ui/RequestError'

export default function ProfilePage() {
  const { profile } = useContext(appContext)
  const role = {
    teacher: profile?.role === 20,
    student: profile?.role === 2,
    parent: profile?.role === 10,
    external: profile?.role === 3,
  }

  const [page, setPage] = useState(1)

  const { setParentProfile, setTeacherProfile, setExternalProfile } = useQueryProfile()
  const {
    list: { data, isLoading, isError },
  } = useQueryCertificates({ page })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    values: {
      personal_site: profile?.personal_site,
      facebook_profile: profile?.facebook_profile,
      linkedin_profile: profile?.linkedin_profile,
      telegram_profile: profile?.telegram_profile,
      about_me: profile?.about_me,
    },
  })

  const onSubmit = (data: any) => {
    console.log('data', data)

    const reqData = data

    Object.keys(reqData).forEach((key) => {
      if (!reqData[key] || reqData[key] === '') delete reqData[key]
    })

    const handler = role.parent ? setParentProfile : role.teacher ? setTeacherProfile : setExternalProfile

    handler(reqData)
      .then(() => {})
      .catch(console.error)
  }

  useSetHeaderParams({ title: 'Особистий кабінет' })

  return (
    <PageWrapper>
      <UploadAvatar
        className="profile__head"
        avatar={profile?.avatar}
        userID={profile?.id}
        editable
      />

      <div className="profile__info">
        <h2 className="profile__title">Профіль</h2>

        <ProfileForm profile={profile} />

        <form
          className="profile__contact"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="profile__contact-inner">
            <div className="profile__links">
              <h2 className="profile__links-title">Посилання</h2>
              <div className="profile__links-list">
                <Field
                  {...register('personal_site')}
                  type="text"
                  placeholder="Вкажіть посилання"
                />
                <Field
                  {...register('facebook_profile')}
                  type="text"
                  placeholder="Введіть ім’я користувача Facebook "
                />
                <Field
                  {...register('linkedin_profile')}
                  type="text"
                  placeholder="Введіть ваш ID LinkedIn"
                />
                <Field
                  {...register('telegram_profile')}
                  type="text"
                  placeholder="Введіть ім’я користувача Telegram"
                />
              </div>
            </div>
            <div className="profile__about">
              <h2 className="profile__about-title">Напишіть коротко про себе</h2>
              <Textarea
                {...register('about_me')}
                placeholder="Напишіть коротко про себе"
              />
            </div>
          </div>
          <Button type="submit">
            <svg className="btn__icon">
              <use href="/img/sprite.svg#check"></use>
            </svg>
            Зберегти
          </Button>
        </form>
        <div className="profile__block">
          <h2 className="profile__block-title">Ваші сертифікати</h2>
          {isLoading && <Loader />}
          {isError && <RequestError />}
          {!!data?.count ? (
            <ul className="profile__certificate">
              {data.results.map((certificate) => (
                <li
                  key={certificate.id}
                  className="profile__certificate-item"
                >
                  <Link
                    href={`/certificates/UnityCer-${certificate.id}`}
                    className="profile__certificate-img"
                  >
                    <Image
                      src={certificate.certificate_image || '/img/static/default-avatar.png'}
                      width={265}
                      height={375}
                      {...imgBlur}
                      style={{ objectFit: 'cover' }}
                      alt={certificate.course_title}
                    />
                  </Link>
                  <p>{certificate.course_title}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className={'offer'}>
              <div className={'offer__inner'}>
                <div className={'offer__title'}>
                  У вас ще немає сертифікатів
                  <svg className={'offer__title-teacher'}>
                    <use href="/img/sprite.svg#course-teacher__home-start"></use>
                  </svg>
                </div>
              </div>
            </div>
          )}
          <AppPagination
            pageSize={4}
            total={data?.count}
            onChange={setPage}
          />
        </div>
      </div>
    </PageWrapper>
  )
}

function ProfileForm({ profile }: { profile?: TAboutMe }) {
  const role = {
    teacher: profile?.role === 20,
    student: profile?.role === 2,
    parent: profile?.role === 10,
    external: profile?.role === 3,
  }

  return (
    <form className="profile__content">
      <div className="profile__form">
        <div className="profile__list">
          <ProfileRow
            label="Ім'я"
            name="first_name"
            editable={!role.student}
          />
          <ProfileRow
            label="Прізвище"
            name="last_name"
            editable={!role.student}
          />
          <ProfileRow
            label="По батькові"
            name="patronymic"
            editable={!role.student}
          />
          {!role.external && (
            <ProfileRow
              label="Дата народження"
              name="date_of_birth"
              editable={false}
            />
          )}
        </div>
      </div>
      <div className="profile__form">
        <div className="profile__list">
          {!role.external && (
            <ProfileRow
              label="Телефон"
              name="phone"
              editable={!role.student}
            />
          )}
          <ProfileRow
            label="Email"
            name="email"
            editable={false}
          />
          <ProfileRow
            label="Місто"
            name="city"
            editable={!role.student}
          />
          <ProfileRow
            label="Пароль"
            name="password"
            editable={!role.student}
          />
        </div>
      </div>
    </form>
  )
}
