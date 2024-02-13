'use client'

import React, { type PropsWithChildren, createContext, useState } from 'react'

import type { IContext, THeader } from '@components/Context/types'

import { TAboutMe } from '@http/profile/type'

const appContext = createContext<IContext>({
  setHeader: () => {},
  setProfile: () => {},
})

function AppProvider({ children }: PropsWithChildren) {
  const [asideIsOpen, setAsideIsOpen] = useState(true)
  const [header, setHeader] = useState<THeader | undefined>(undefined)
  const [profile, setProfile] = useState<TAboutMe | undefined>(undefined)

  const handleSetAsideIsOpen = () => setAsideIsOpen((p) => !p)

  const handleSetHeader = (params: THeader) => setHeader(params)

  const state: IContext = {
    asideIsOpen,
    handleSetAsideIsOpen,
    header: header,
    setHeader: handleSetHeader,
    profile,
    setProfile,
  }

  return <appContext.Provider value={state}>{children}</appContext.Provider>
}

export { appContext, AppProvider }
