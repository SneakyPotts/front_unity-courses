import classNames from 'classnames'
import React from 'react'

import type { TypesListProps } from './TypesList.props'

const typesItems = [
  {
    id: 'online_lesson_link',
    tipText: 'Онлайн-урок',
    icon: 'webcam',
    isCompleted: false,
  },
  {
    id: 'has_homework',
    tipText: 'Домашня робота',
    icon: 'home',
    isCompleted: false,
  },
  {
    id: 'has_test',
    tipText: 'Тест',
    icon: 'test',
    isCompleted: false,
  },
  {
    id: 'has_self_education_work',
    tipText: 'Самостійна робота',
    icon: 'pen',
    isCompleted: false,
  },
]

export function TypesList({ className, data }: TypesListProps) {
  return (
    <div className={classNames('types', className)}>
      <ul className="types__list">
        {typesItems.map((item) =>
          !!data?.[item.id] ? (
            <li
              key={item.id}
              className="types__unit"
            >
              <div
                className={`types__icon ${item.isCompleted && 'types__icon--active'}`}
                data-tippy-content={item.tipText}
              >
                <svg className="types__icon-svg">
                  <use href={`/img/sprite.svg#${item.icon}`}></use>
                </svg>
              </div>
            </li>
          ) : null,
        )}
      </ul>

      {/* need hidden check icon when all tasks completed. Example all test or home work.*/}
      {/*<div className="types__final">*/}
      {/*  <svg className="types__icon-svg">*/}
      {/*    <use href="/img/sprite.svg#check"></use>*/}
      {/*  </svg>*/}
      {/*</div>*/}
    </div>
  )
}
