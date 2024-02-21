import React from 'react'

import type { TPageProps } from '@assets/types/globals'

import { ReviewsContent } from '_content/ReviewsContent'

export default function ReviewsPage({ params }: TPageProps) {
  console.log('ReviewsPage', params)

  return <ReviewsContent />
}
