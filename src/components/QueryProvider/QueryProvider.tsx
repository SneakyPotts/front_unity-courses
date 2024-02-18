'use client'

import React from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import type { QueryProviderProps } from './QueryProvider.props'

const queryClient = new QueryClient()

export function QueryProvider({ children }: QueryProviderProps) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
