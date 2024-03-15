import React from 'react'

import type { TPageProps } from '@assets/types/globals'
import { getCourseReviews } from '@http/courses/server'

import { ReviewsContent } from '_content/ReviewsContent'

export default async function ReviewsPage({ params, searchParams }: TPageProps) {
  const { data } = await getCourseReviews({
    course_id: params.course_id as string,
    page: searchParams.page,
  })

  return <ReviewsContent data={data} />
}
