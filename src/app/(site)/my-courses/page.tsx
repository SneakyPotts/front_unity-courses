import React from 'react'

import { aboutMeRequest } from '@http/profile/server'

import { MyCoursesContent } from '_content/MyCoursesContent'

export default async function MyCoursesPage() {
  const { data: me } = await aboutMeRequest()
  const role = {
    teacher: me?.role === 20,
    student: me?.role === 2,
    parent: me?.role === 10,
  }

  return <MyCoursesContent role={role} />
}
