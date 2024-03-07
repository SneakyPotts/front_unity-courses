import classNames from 'classnames'
import { format } from 'date-fns'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useToggle } from 'usehooks-ts'

import dynamic from 'next/dynamic'
import Image from 'next/image'

import { dynamicOptions } from '@assets/constants'
import { appContext } from '@components/Context/context'
import type { TReviewItem } from '@http/courses/type'
import { useQueryTeacher } from '@http/teacher/client'

import { Button } from '_ui/Button'
import { RatingStars } from '_ui/RatingStars'
import { TeacherForCourse } from '_ui/TeacherForCourse'
import { toastPromise } from '_ui/ToastUtils'

import type { ReviewItemProps } from './ReviewItem.props'

const TextEditor = dynamic(() => import('@components/TextEditor').then((mod) => mod.TextEditor), {
  ...dynamicOptions,
  ssr: false,
})

export function ReviewItem({ courseId, ...review }: ReviewItemProps) {
  const { profile } = useContext(appContext)
  const role = {
    teacher: profile?.role === 20,
  }

  const { addReviewReply } = useQueryTeacher({})

  const content = useRef<HTMLDivElement>(null)

  const [isLargeContent, setIsLargeContent] = useState(true)

  const [isShowReply, setIsShowReply] = useToggle(false)

  const [text, setText] = useState('')
  const [replies, setReplies] = useState(review?.replies || [])
  const [isAllowAddReply, setIsAllowAddReply] = useState(false)

  const handleSendReviewComment = () => {
    toastPromise<TReviewItem>({
      handler: addReviewReply({ course_id: courseId, review_id: review.id, content: text }),
      successCallback: (newReply) => {
        setReplies([...(newReply?.data.replies || [])])
        setIsAllowAddReply(false)
      },
      successMessage: 'Коментар успішно збережений',
    })
  }

  useEffect(() => {
    const contentHeight = content?.current?.scrollHeight
    Number(contentHeight) < 63 && setIsLargeContent(false)
  }, [])

  useEffect(() => {
    setIsAllowAddReply(!replies.find((reply) => reply.user.id === profile?.id))
  }, [profile])

  return (
    <div
      id={review.id}
      className={'subject-card--blue reviews__box'}
    >
      <div className={'reviews__user'}>
        <div className={'archive__review-photo  reviews__user--photo'}>
          <Image
            src={review.user.avatar}
            width={40}
            height={40}
            alt="фото профелю"
          />
        </div>
        <div className={'reviews__person'}>
          <p className={'reviews__name'}>{`${review.user.last_name} ${review.user.first_name}`}</p>
        </div>
        <div className={'reviews__ratings reviews__ratings--user'}>
          <RatingStars
            value={review.rating || 0}
            readOnly
          />
        </div>
        <time
          className={'reviews__data'}
          dateTime={'12.09.2023'}
        >
          {format(new Date(review.created_at), 'dd.MM.yyyy HH:mm')}
        </time>
      </div>
      <div className={'reviews__content'}>
        <div className={'reviews__info'}>
          <div
            ref={content}
            className={classNames('reviews__info-text', { 'reviews__info--large': isLargeContent })}
            dangerouslySetInnerHTML={{ __html: review.content }}
          />
          {isLargeContent && (
            <button
              className={'reviews__comments-btn  reviews__info-full'}
              onClick={() => setIsLargeContent(false)}
            >
              читати далі
            </button>
          )}
        </div>
        {(role.teacher || !!review.replies.length) && (
          <div className={'reviews__comments'}>
            <button
              className={'reviews__comments-btn'}
              onClick={setIsShowReply}
            >
              Відповідь
            </button>
            <svg className="select__top-svg ">
              <use href="/img/sprite.svg#dropdown-arrow"></use>
            </svg>
          </div>
        )}
        {isShowReply && (
          <>
            <div className={'reviews__info reviews__comments--open'}>
              {replies.map((reply) => (
                <>
                  <div className={'courses-catalog__teacher reviews__item-user'}>
                    <TeacherForCourse lecturer={reply.user} />

                    <div className={'reviews__item-data'}>
                      <p className={'reviews__data'}>{format(new Date(reply.created_at), 'dd.MM.yyyy HH:mm')}</p>
                    </div>
                  </div>
                  <div className={'reviews__info reviews__item-text'}>
                    <div
                      className={'reviews__info-texts'}
                      dangerouslySetInnerHTML={{ __html: reply.content }}
                    />
                  </div>
                </>
              ))}
            </div>
            {isAllowAddReply && (
              <>
                <div className={'reviews__callback reviews__comments--open'}>
                  <TextEditor
                    version={5}
                    config={{
                      placeholder: 'Введіть текст коментаря',
                    }}
                    data={text}
                    onChange={setText}
                  />
                </div>
                <Button
                  className={'reviews__content--btn some_button'}
                  onClick={handleSendReviewComment}
                >
                  <svg className="courses-catalog__svg">
                    <use href="/img/sprite.svg#plus"></use>
                  </svg>
                  додати Відповідь
                </Button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
