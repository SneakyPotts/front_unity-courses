import dynamic from 'next/dynamic'

import { AboutMeRequest } from '@http/profile/server'

import { Loader } from '_ui/Loader'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const HomeContent = dynamic(() => import('./home.content').then((mod) => mod.default), {
  loading: () => <Loader />,
  ssr: false,
})

export default async function HomePage() {
  const token = cookies().get('accessToken')

  if (!token)
    redirect('/')

  const { data } = await AboutMeRequest()

  const role = {
    teacher: data?.role === 20,
    student: data?.role === 2,
    parent: data?.role === 10,
  }

  return <HomeContent role={role} />
}
