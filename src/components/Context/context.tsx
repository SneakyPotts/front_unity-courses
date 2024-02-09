'use client'

import React, { type PropsWithChildren, createContext, useState } from 'react'

import type { IContext } from '@components/Context/types'

const appContext = createContext<IContext>({})

function AppProvider({ children }: PropsWithChildren) {
  const [asideIsOpen, setAsideIsOpen] = useState(true)

  const handleSetAsideIsOpen = () => setAsideIsOpen((p) => !p)

  const state: IContext = {
    asideIsOpen,
    handleSetAsideIsOpen,
  }

  return <appContext.Provider value={state}>{children}</appContext.Provider>
}

export { appContext, AppProvider }
