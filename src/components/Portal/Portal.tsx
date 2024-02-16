import { type PropsWithChildren, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

import { PortalProps } from './Portal.props'

const modalRoot = typeof document !== 'undefined' ? (document.querySelector('body') as HTMLElement) : null

export function Portal({ children }: PropsWithChildren<PortalProps>) {
  const el = useRef(typeof document !== 'undefined' ? document.createElement('div') : null)

  useEffect(() => {
    const element = el.current

    if (modalRoot !== null && element !== null) {
      modalRoot.appendChild(element)
    }

    return () => {
      if (modalRoot !== null && element !== null && modalRoot.contains(element)) {
        modalRoot.removeChild(element)
      }
    }
  }, [])

  return el.current !== null ? createPortal(children, el.current) : null
}
