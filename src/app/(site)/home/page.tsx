import dynamic from 'next/dynamic'

import { dynamicOptions } from '@assets/constants'
import { aboutMeRequest } from '@http/profile/server'

const HomePageContent = dynamic(() => import('_content/HomePageContent').then((mod) => mod.default), {
  ...dynamicOptions,
  ssr: false,
})

export default async function HomePage() {
  const { data } = await aboutMeRequest()

  const role = {
    teacher: data?.role === 20,
    student: data?.role === 2,
    parent: data?.role === 10,
  }

  return <HomePageContent role={role} />
}
