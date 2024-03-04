import React from 'react'

import type { TPageProps } from '@assets/types/globals'
import { getCourseReviews } from '@http/courses/server'

import { ReviewsContent } from '_content/ReviewsContent'

export default async function ReviewsPage({ params }: TPageProps) {
  const { data, error } = await getCourseReviews(params.course_id as string)

  return <ReviewsContent data={data} />
}
