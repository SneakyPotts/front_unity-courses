'use client'

import React, { createContext, useState, type PropsWithChildren } from 'react'

import type { IContext } from '@components/Context/types'

const appContext = createContext<IContext>({})

function AppProvider({ children }: PropsWithChildren) {
  const [asideIsOpen, setAsideIsOpen] = useState(false)

  const handleSetAsideIsOpen = () => setAsideIsOpen((p) => !p)

  const state: IContext = {
    asideIsOpen,
    handleSetAsideIsOpen,
  }

  return <appContext.Provider value={state}>{children}</appContext.Provider>
}

export { appContext, AppProvider }
