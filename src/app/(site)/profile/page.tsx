'use client'

import { useContext, useState } from 'react'

import Image from 'next/image'

import { appContext } from '@/components/Context/context'
import { useQueryCertificates } from '@http/profile/client.certificates'

import { PageWrapper } from '_ui/PageWrapper'

export default function ProfilePage() {
  const { profile } = useContext(appContext)

  const [page, setPage] = useState(1)

  const {
    list: { data, isLoading, isError },
  } = useQueryCertificates({ page })

  return <PageWrapper>тут буде мій профіль</PageWrapper>
}
