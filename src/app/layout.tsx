import classNames from 'classnames'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import 'simplebar-react/dist/simplebar.min.css'

import RobotoFont from '@assets/font'
import '@assets/scss/main.scss'
import { AppProvider } from '@components/Context/context'

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
      <body className={classNames(RobotoFont.className, 'body-mob-fixed grid-layout')}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
