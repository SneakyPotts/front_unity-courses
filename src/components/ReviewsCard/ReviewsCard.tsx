import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import type { ReviewsCardProps } from './ReviewsCard.props'

export function ReviewsCard({ courseId, ...review }: ReviewsCardProps) {
  return (
    <div className={'archive__review'}>
      <div className={'archive__review-top'}>
        <div className={'archive__review-user'}>
          <div className={'reviews__person'}>
            <div className={'archive__review-photo'}>
              <Image
                src={review.user.avatar}
                width={40}
                height={40}
                alt={`${review.user.last_name} ${review.user.first_name}`}
              />
            </div>
          </div>
          <p>{`${review.user.last_name} ${review.user.first_name}`}</p>
        </div>
        <div className={'archive__review-assessment'}>
          <svg className="archive__reviews-svg">
            <use href="/img/sprite.svg#star"></use>
          </svg>
          <p>{review.rating}</p>
        </div>
      </div>
      <div
        className={'archive__review-text'}
        dangerouslySetInnerHTML={{ __html: review.content || '' }}
      />
      <Link
        href={`/reviews/${courseId}#${review.id}`}
        className={'archive__review-link'}
      >
        Відгук повністю
      </Link>
    </div>
  )
}
