import { useState } from 'react'

export function useAnimate(onClose?: () => void): [boolean, () => void] {
  const [isAnimate, setIsAnimate] = useState(false)

  const closeHandler = () => {
    if (onClose) {
      setIsAnimate(true)
      setTimeout(() => {
        onClose()
        setIsAnimate(false)
      }, 300)
    }
  }

  return [isAnimate, closeHandler]
}
