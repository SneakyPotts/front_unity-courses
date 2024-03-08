import classNames from 'classnames'
import type { Metadata } from 'next'
import React, { type ReactNode } from 'react'
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-toastify/dist/ReactToastify.css'
import 'simplebar-react/dist/simplebar.min.css'

import Script from 'next/script'

import RobotoFont from '@assets/font'
import '@assets/scss/main.scss'
import { AppProvider } from '@components/Context/context'
import '@smastrom/react-rating/style.css'

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
        <Script
          strategy="beforeInteractive"
          src="https://unpkg.com/@rdkit/rdkit/dist/RDKit_minimal.js"
        />
        <Script
          strategy="beforeInteractive"
          src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/js/all.min.js"
        />

        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
