'use client'

import { MathJaxContext } from 'better-react-mathjax'
import React, { type PropsWithChildren, createContext, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'

import type { IContext, THeader } from '@components/Context/types'
import { QueryProvider } from '@components/QueryProvider'
import { TAboutMe, TBasketCourse } from '@http/profile/type'

const config = {
  loader: { load: ['[tex]/html'] },
  tex: {
    packages: { '[+]': ['html'] },
    inlineMath: [
      ['$', '$'],
      ['\\(', '\\)'],
    ],
    displayMath: [
      ['$$', '$$'],
      ['\\[', '\\]'],
    ],
  },
}

const appContext = createContext<IContext>({
  setHeader: () => {},
  setProfile: () => {},
  setBasket: () => {},
  setWish: () => {},
})

function AppProvider({ children }: PropsWithChildren) {
  const [asideIsOpen, setAsideIsOpen] = useState(true)
  const [header, setHeader] = useState<THeader | undefined>(undefined)
  const [profile, setProfile] = useState<TAboutMe | undefined>(undefined)
  const [basket, setBasket] = useState<TBasketCourse[] | undefined>(undefined)
  const [wish, setWish] = useState<string[] | undefined>(undefined)

  const handleSetAsideIsOpen = () => setAsideIsOpen((p) => !p)

  const handleSetHeader = (params: THeader) => setHeader(params)

  const state: IContext = {
    asideIsOpen,
    handleSetAsideIsOpen,
    header: header,
    setHeader: handleSetHeader,
    profile,
    setProfile,
    basket,
    setBasket,
    wish,
    setWish,
  }

  useEffect(() => {
    const handleCopy = (event: ClipboardEvent) => {
      const clipboardData = event.clipboardData
      clipboardData?.setData('text/plain', 'Копіювання заборонено. Із повагою Unity! <3')
      event.preventDefault()
    }

    document.addEventListener('copy', handleCopy)

    return () => {
      document.removeEventListener('copy', handleCopy)
    }
  }, [])

  return (
    <appContext.Provider value={state}>
      <QueryProvider>
        <MathJaxContext
          version={3}
          config={config}
        >
          {children}

          <ToastContainer
            position="top-right"
            autoClose={5000}
            closeButton={false}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={false}
            theme="light"
          />
        </MathJaxContext>
      </QueryProvider>
    </appContext.Provider>
  )
}

export { appContext, AppProvider }
