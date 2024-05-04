import classNames from 'classnames'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useOnClickOutside, useSessionStorage } from 'usehooks-ts'

import Image from 'next/image'

import { appContext } from '@components/Context/context'

import type { ChildrenSelectListProps } from './ChildrenSelectList.props'

export function ChildrenSelectList({ mobile }: ChildrenSelectListProps) {
  const { profile } = useContext(appContext)

  const list = profile ? [{ ...profile, id: '' }, ...profile.parent_profile.childs] : []

  const select = useRef<HTMLDivElement>(null)

  const [childID, setChildID] = useSessionStorage('childID', '')

  const [showList, setShowList] = useState(false)
  const [currentChild, setCurrentChild] = useState<{
    id: string
    avatar: string
    first_name: string
    last_name: string
  }>()

  const handleShowShowList = () => {
    list && list?.length > 1 && setShowList((p) => !p)
  }

  const handleChangeChild = (id: string) => {
    const child = list?.find((v) => v.id === id)

    setCurrentChild(child)
    setChildID(child?.id!)
    setShowList(false)
  }

  useEffect(() => {
    if (!childID && profile) {
      setCurrentChild(list?.[0])
      setChildID(list?.[0].id!)
    } else {
      setCurrentChild(list?.find((v) => v.id === childID))
    }
  }, [profile])

  useOnClickOutside(select, () => setShowList(false))

  if (!profile) return null

  if (mobile)
    return (
      <div className="header__children-switcher">
        {list?.map((v) => (
          <label
            key={v.id}
            className={classNames('header__children-label', { '--isActive': currentChild?.id === v.id })}
            onClick={() => handleChangeChild(v.id)}
          >
            <input
              type="radio"
              name="child"
              checked={currentChild?.id === v.id}
              className="visually-hidden"
            />
            <div className="header__children-img">
              <Image
                src={v.avatar || '/img/static/default-avatar.png'}
                width={24}
                height={24}
                alt={`${v.first_name} ${v.last_name}`}
              />
            </div>
            <span className="header__children-span">{`${v.first_name} ${v.last_name}`}</span>
          </label>
        ))}
        {/*<label*/}
        {/*  className={classNames('header__children-label', { '--isActive': currentChild?.id === profile.id })}*/}
        {/*  onClick={() => handleChangeChild(profile.id)}*/}
        {/*>*/}
        {/*  <input*/}
        {/*    type="radio"*/}
        {/*    name="child"*/}
        {/*    checked={currentChild?.id === profile.id}*/}
        {/*    className="visually-hidden"*/}
        {/*  />*/}
        {/*  <div className="header__children-img">*/}
        {/*    <Image*/}
        {/*      src={profile.avatar || '/img/static/default-avatar.png'}*/}
        {/*      width={24}*/}
        {/*      height={24}*/}
        {/*      alt={`${profile.first_name} ${profile.last_name}`}*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*  <span className="header__children-span">{`${profile.first_name} ${profile.last_name}`}</span>*/}
        {/*</label>*/}
      </div>
    )

  return (
    <div
      ref={select}
      className={classNames('header__children select select--children', { 'select--active': showList })}
    >
      <div
        className="select__top"
        onClick={handleShowShowList}
      >
        <Image
          className="select__image"
          src={currentChild?.avatar || '/img/static/default-avatar.png'}
          width={24}
          height={24}
          alt={`${currentChild?.first_name} ${currentChild?.last_name}`}
        />
        <span className="select__value">{currentChild?.first_name}</span>

        {list && list?.length > 1 && (
          <svg className="select__top-svg">
            <use href="/img/sprite.svg#dropdown-arrow"></use>
          </svg>
        )}
      </div>
      {list && list?.length > 1 && (
        <div className="select__bottom">
          <div className="select__wrapper">
            <ul className="select__list">
              {list?.map((v) => (
                <li
                  key={v.id}
                  className="select__item"
                  onClick={() => handleChangeChild(v.id)}
                >
                  <Image
                    className="select__image"
                    src={v.avatar || '/img/static/default-avatar.png'}
                    width={24}
                    height={24}
                    alt={`${v.first_name} ${v.last_name}`}
                  />
                  <span className="select__value">{v.first_name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
