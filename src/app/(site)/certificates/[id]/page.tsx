import type { Metadata, ResolvingMetadata } from 'next'

import type { TPageProps } from '@assets/types/globals'
import { getCertificateById } from '@http/profile/server'

import { RequestError } from '_ui/RequestError'

import { CertificatePageContent } from '_content/CertificatePageContent'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export async function generateMetadata({ params }: TPageProps, parent: ResolvingMetadata): Promise<Metadata> {
  const id = (params.id as string).replace('UnityCer-', '')
  const { data } = await getCertificateById(id)

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    metadataBase: new URL(baseUrl || ''),
    title: `"${data?.course.title}" - ${data?.student.first_name} ${data?.student.last_name}`,
    description: `Сертифікат студента "${data?.student.first_name} ${data?.student.last_name}" - курс "${data?.course.title}"`,
    openGraph: {
      images: [...(data ? [data.course.cover] : []), ...previousImages],
    },
  }
}

export default async function CertificatePage({ params }: TPageProps) {
  const id = (params.id as string).replace('UnityCer-', '')
  const { data, error } = await getCertificateById(id)

  if (error) return <RequestError {...error} />

  if (data) return <CertificatePageContent data={data} />
}
