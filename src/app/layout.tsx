import classNames from 'classnames'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { Inter, Roboto } from 'next/font/google'

import '@assets/scss/main.scss'

import { AppProvider } from '@components/Context/context'

const inter = Inter({ subsets: ['latin'] })

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Unity - Courses',
  description: 'Generated Unity - Courses',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="uk">
      <body className={classNames(roboto.className, 'body-mob-fixed grid-layout')}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
