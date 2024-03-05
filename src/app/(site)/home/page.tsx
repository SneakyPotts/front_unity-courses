import dynamic from 'next/dynamic'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { dynamicOptions } from '@assets/constants'
import { aboutMeRequest } from '@http/profile/server'

const HomePageContent = dynamic(() => import('_content/HomePageContent').then((mod) => mod.HomePageContent), {
  ...dynamicOptions,
  ssr: false,
})

export default async function HomePage() {
  const token = cookies().get('accessToken')

  if (!token) redirect('/')

  const { data } = await aboutMeRequest()

  const role = {
    teacher: data?.role === 20,
    student: data?.role === 2,
    parent: data?.role === 10,
  }

  return <HomePageContent role={role} />
}
