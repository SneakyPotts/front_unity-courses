import { type DependencyList, useEffect } from 'react'

export function useBlockScroll(dependencyList?: DependencyList | undefined) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'relative'

    document.getElementsByTagName('html')[0].style.overflow = 'hidden'
    document.getElementsByTagName('html')[0].style.position = 'relative'

    return () => {
      document.body.removeAttribute('style')
      document.getElementsByTagName('html')[0].removeAttribute('style')
    }
  }, [dependencyList])
}
