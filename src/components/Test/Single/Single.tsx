import classNames from 'classnames'
import React from 'react'

import { TAnswerCheck } from '@assets/types/globals'
import { TestWrapper } from '@components/Test'
import { TOption } from '@http/teacher/types'

import type { ListItemProps, SingleProps } from './Single.props'

export function Single({ id, type, question, description, options, indexNumber, variant, handleChange }: SingleProps) {
  const isColumn = (options as Array<TAnswerCheck | TOption>).every((v) => !v.image_answer)

  const isShowIcon = (correct: boolean, current: boolean) => {
    if (!correct && !current) return undefined

    return !(!correct && current)
  }

  return (
    <TestWrapper
      indexNumber={indexNumber}
      question={question}
      description={description}
    >
      {variant === 'question' ? (
        <ul className={classNames({ tests__list: isColumn, tests__description: !isColumn })}>
          {options.map((v, i) => (
            <ListItem
              key={`${v.image_answer}_${v.text_answer}-${i}`}
              type={type}
              item={v}
              name={type === 'radio' ? id : `${id}_${i}`}
              onChange={handleChange && (() => handleChange(v.id!))}
            />
          ))}
        </ul>
      ) : (
        <ul className={classNames({ tests__list: isColumn, tests__description: !isColumn })}>
          {options.map((v, i) => (
            <ListItem
              key={`${v.image_answer}_${v.text_answer}-${i}`}
              className={classNames('--answer', { '--selected': v.student_checked_as_correct })}
              type={type}
              item={v}
              name={type === 'radio' ? id : `${id}_${i}`}
              checked={v.student_checked_as_correct}
              icon={isShowIcon(v.is_correct, v.student_checked_as_correct)}
            />
          ))}
        </ul>
      )}
    </TestWrapper>
  )
}

function ListItem({ item, type, icon, className, ...props }: ListItemProps) {
  const CheckMarker = () => (
    <div className={`${type}__block`}>
      <span className={`${type}__checkmark ${type}__checkmark--default`}>
        <svg>
          <use href={`/img/sprite.svg#${type}-default`} />
        </svg>
      </span>
      <span className={`${type}__checkmark ${type}__checkmark--active`}>
        <svg>
          <use href={`/img/sprite.svg#${type}-active`} />
        </svg>
      </span>
    </div>
  )

  return (
    <li className={classNames('tests__item', className, { 'tests__item--element': !!item.text_answer?.length && item.image_answer })}>
      <label className={classNames('tests__item-lable', { 'radio tests__item--radio': type === 'radio', 'field__checkbox checkbox': type === 'checkbox' })}>
        <input
          type={type === 'radio' ? 'radio' : 'checkbox'}
          className={classNames({ radio__input: type === 'radio', checkbox__input: type === 'checkbox' })}
          {...props}
        />

        <CheckMarker />

        {!!item.text_answer?.length && <span lang="uk">{item.text_answer}</span>}

        {item.image_answer && (
          <div className="tests__item-photo">
            {typeof icon === 'boolean' && (
              <span className={classNames('tests__answer-icon --img', { '--true': icon, '--false': !icon })}>
                <svg>
                  <use href={`/img/sprite.svg#${icon ? 'check' : 'cross'}`}></use>
                </svg>
              </span>
            )}
            <img
              src={item.image_answer}
              alt={item.text_answer}
            />
          </div>
        )}

        {!item.image_answer && typeof icon === 'boolean' && (
          <span className={classNames('tests__answer-icon --txt', { '--true': icon, '--false': !icon })}>
            <svg>
              <use href={`/img/sprite.svg#${icon ? 'check' : 'cross'}`}></use>
            </svg>
          </span>
        )}
      </label>
    </li>
  )
}
