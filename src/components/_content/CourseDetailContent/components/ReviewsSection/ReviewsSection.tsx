import { ReviewsCard } from '@components/ReviewsCard'

import { Button } from '_ui/Button'

import type { ReviewsSectionProps } from './ReviewsSection.props'

export function ReviewsSection({ courseId, reviews }: ReviewsSectionProps) {
  return (
    <div
      id="reviews"
      className={'archive__reviews'}
    >
      <div className={'archive__reviews-top'}>
        <h3 className={'archive__subtitle'}>Відгуки</h3>
        <Button
          className={'some_button'}
          variant={'border'}
          href={`/reviews/${courseId}`}
        >
          <svg className="archive__data-svg">
            <use href="/img/sprite.svg#message"></use>
          </svg>
          Всі відгуки
        </Button>
      </div>
      <div className={'archive__reviews-content'}>
        {reviews?.map((review) => (
          <ReviewsCard
            key={review.id}
            courseId={courseId}
            {...review}
          />
        ))}
      </div>
    </div>
  )
}
