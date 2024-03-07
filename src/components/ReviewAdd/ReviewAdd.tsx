import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'

import Image from 'next/image'

import { appContext } from '@components/Context/context'
import { TextEditor } from '@components/TextEditor'
import type { TReviewItem } from '@http/courses/type'
import { useQueryStudent } from '@http/student/client'

import { Button } from '_ui/Button'
import { RatingStars } from '_ui/RatingStars'
import { toastPromise } from '_ui/ToastUtils'

import type { ReviewAddProps } from './ReviewAdd.props'

export function ReviewAdd({ courseId, handleAdd }: ReviewAddProps) {
  const { profile } = useContext(appContext)

  const { addReview } = useQueryStudent({})

  const [rating, setRating] = useState(0)
  const [text, setText] = useState('')

  const handleSendReview = () => {
    if (!text.length || !rating) {
      toast.error("Дані відгуку не повні. Рейтинг і текст відгуку обов'язкові!")

      return
    }

    if (handleAdd && courseId) {
      toastPromise<TReviewItem>({
        handler: addReview({ course_id: courseId, rating, content: text }),
        successCallback: (newReview) => {
          handleAdd(newReview?.data!)
        },
      })
    }
  }

  return (
    <div className={'subject-card--blue reviews__box'}>
      <div className={'reviews__user'}>
        <div className={'archive__review-photo  reviews__user--photo'}>
          <Image
            src={profile?.avatar || '/img/static/default-avatar.png'}
            width={40}
            height={40}
            alt={`${profile?.last_name} ${profile?.first_name}`}
          />
        </div>
        <div className={'reviews__person'}>
          <p className={'reviews__name'}>{`${profile?.last_name} ${profile?.first_name}`}</p>
        </div>
        <div className={'reviews__ratings reviews__ratings--user'}>
          <RatingStars
            value={rating}
            onChange={setRating}
          />
        </div>
      </div>
      <div className={'reviews__content'}>
        <div className={'reviews__callback reviews__comments--open'}>
          <TextEditor
            version={5}
            config={{
              placeholder: 'Введіть текст відгуку',
            }}
            data={text}
            onChange={setText}
          />
        </div>
        <Button
          className={'reviews__content--btn some_button'}
          onClick={handleSendReview}
        >
          <svg className="courses-catalog__svg">
            <use href="/img/sprite.svg#plus"></use>
          </svg>
          додати відгук
        </Button>
      </div>
    </div>
  )
}
