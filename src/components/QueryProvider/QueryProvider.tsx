'use client'

import React, { useState } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import type { QueryProviderProps } from './QueryProvider.props'

export function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(() => new QueryClient())

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
