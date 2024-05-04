import React from 'react'

import { getWishList } from '@http/student/server'

import { MyCoursesEmpty } from '_ui/MyCoursesEmpty'
import { PageWrapper } from '_ui/PageWrapper'
import { RequestError } from '_ui/RequestError'

import { WishlistPageContent } from '_content/WishlistPageContent'

export default async function WishlistPage() {
  const { data, error } = await getWishList()

  if (error) return <RequestError {...error} />

  if (data) return <PageWrapper>{!data.courses.length ? <MyCoursesEmpty /> : <WishlistPageContent data={data} />}</PageWrapper>
}
