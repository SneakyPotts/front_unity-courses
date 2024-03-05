import React from 'react'

import { Rating, Star } from '@smastrom/react-rating'

import type { RatingStarsProps } from './RatingStars.props'

export function RatingStars({ value, onChange, readOnly }: RatingStarsProps) {
  return (
    <Rating
      itemStyles={{
        itemShapes: Star,
        activeFillColor: '#F2C94C',
        activeStrokeColor: '#F2C94C',
        inactiveStrokeColor: '#F2C94C',
        itemStrokeWidth: 2,
      }}
      style={{ maxWidth: 100 }}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
    />
  )
}
