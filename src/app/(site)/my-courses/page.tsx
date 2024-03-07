import React from 'react'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { MyCoursesContent } from '_content/MyCoursesContent'

export default function MyCoursesPage() {
  const token = cookies().get('accessToken')

  if (!token) redirect('/')

  return <MyCoursesContent />
}
