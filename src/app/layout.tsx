import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@assets/scss/main.scss'
import type { ReactNode } from 'react'
import classNames from 'classnames'
import { AppProvider } from '@components/Context/context'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={classNames(inter.className, 'body-mob-fixed')}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
