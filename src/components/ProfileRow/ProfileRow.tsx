import { format } from 'date-fns'
import React, { type ChangeEvent, useContext, useEffect, useMemo, useState } from 'react'
import Skeleton from 'react-loading-skeleton'

import { appContext } from '@components/Context/context'
import { useQueryProfile } from '@http/profile/client'
import { TProfile } from '@http/profile/type'

import { Field } from '_ui/Field'

import { ChangePasswordModal } from '_modals/ChangePasswordModal'

import type { ProfileRowProps } from './ProfileRow.props'

const extractProfileFields = (profile: TProfile) => {
  const { first_name, last_name, patronymic, date_of_birth, gender, phone, email, city, address } = profile

  return { first_name, last_name, patronymic, date_of_birth, gender, phone, email, city, address }
}

export function ProfileRow({ name, label, editable = true }: ProfileRowProps) {
  const { profile } = useContext(appContext)
  const role = {
    teacher: profile?.role === 20,
    student: profile?.role === 2,
    parent: profile?.role === 10,
    external: profile?.role === 3,
  }

  const data: TProfile | undefined = useMemo(() => {
    if (!profile) return undefined

    switch (profile.role) {
      case 20:
        return extractProfileFields(profile.teacher_profile)
      case 2:
        return extractProfileFields(profile.student_profile)
      case 10:
        return extractProfileFields(profile.parent_profile)
      default:
        return extractProfileFields(profile.ext_student_profile)
    }
  }, [profile])

  const currentValue = useMemo(() => {
    switch (name) {
      case 'password':
        return undefined
      case 'date_of_birth':
        return !!data?.[name]?.length ? format(new Date(data[name]), 'dd.MM.yyyy') : ''
      default:
        return data?.[name]
    }
  }, [data])

  const { setParentProfile, setTeacherProfile, setExternalProfile } = useQueryProfile()

  const [isEdit, setIsEdit] = useState(false)
  const [value, setValue] = useState('')
  const [isShowChangePassModal, setIsShowChangePassModal] = useState(false)

  const handleEdit = () => {
    name === 'password' ? setIsShowChangePassModal(true) : setIsEdit(true)
  }
  const handleSave = () => {
    const updatedData = { id: profile?.id!, [name]: value }
    const handler = role.parent ? setParentProfile : role.teacher ? setTeacherProfile : setExternalProfile

    handler(updatedData)
      .then(() => setIsEdit(false))
      .catch(console.error)
  }

  useEffect(() => {
    setValue(currentValue || '')
  }, [currentValue])

  return (
    <li className={'profile__item'}>
      {isEdit ? (
        <>
          <Field
            type={name === 'password' ? 'password' : 'text'}
            className="profile__wrapper-field"
            placeholder={label}
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
            defaultValue={currentValue}
          />
          <button
            type="button"
            className={'profile__wrapper-btn --save'}
            onClick={handleSave}
          >
            <svg>
              <use href="/img/sprite.svg#check"></use>
            </svg>
          </button>
        </>
      ) : (
        <>
          <div className={'profile__wrapper'}>
            <span className={'profile__wrapper-info'}>{label}</span>
            <div className={'profile__wrapper-box'}></div>
            {profile ? (
              <span className={'profile__wrapper-value'}>{currentValue ?? '*** *** ***'}</span>
            ) : (
              <Skeleton
                height={19}
                width={100}
              />
            )}
          </div>
          {editable && (
            <button
              type="button"
              className={'profile__wrapper-btn'}
              onClick={handleEdit}
            >
              <svg>
                <use href="/img/sprite.svg#pencil"></use>
              </svg>
            </button>
          )}
        </>
      )}
      {isShowChangePassModal && <ChangePasswordModal onClose={() => setIsShowChangePassModal(false)} />}
    </li>
  )
}
