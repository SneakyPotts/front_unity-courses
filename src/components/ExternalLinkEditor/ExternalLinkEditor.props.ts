import type { ReactNode } from 'react'

export interface ExternalLinkEditorProps {
  title: string
  label: string
  buttonContent: ReactNode | string
  initialLink?: string
  handler: (link: string) => Promise<any>
}
