import { type PropsWithChildren, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

import { PortalProps } from './Portal.props'

const modalRoot = typeof document !== 'undefined' ? (document.querySelector('body') as HTMLElement) : null

export function Portal({ children }: PropsWithChildren<PortalProps>) {
  const el = useRef(typeof document !== 'undefined' ? document.createElement('div') : null)

  useEffect(() => {
    if (modalRoot !== null && el.current !== null) {
      modalRoot.appendChild(el.current)
    }

    return () => {
      if (modalRoot !== null && el.current !== null) {
        modalRoot.removeChild(el.current)
      }
    }
  }, [])

  return el.current !== null ? createPortal(children, el.current) : null
}
