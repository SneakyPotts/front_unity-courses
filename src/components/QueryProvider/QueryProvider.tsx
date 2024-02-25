'use client'

import React from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import type { QueryProviderProps } from './QueryProvider.props'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
    },
  },
})

export function QueryProvider({ children }: QueryProviderProps) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
