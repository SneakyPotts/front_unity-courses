import { useContext, useLayoutEffect } from 'react'

import { appContext } from '@components/Context/context'
import type { THeader } from '@components/Context/types'

export function useSetHeaderParams({ ...params }: THeader) {
  const { setHeader } = useContext(appContext)

  useLayoutEffect(() => {
    setHeader(params)
  }, [])
}
