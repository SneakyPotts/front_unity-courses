import { MathJax } from 'better-react-mathjax'
import React from 'react'

import { useAssemblyContent } from '@hooks/useAssemblyContent'

import type { AssemblyContentProps } from './AssemblyContent.props'

export function AssemblyContent({ content, className }: AssemblyContentProps) {
  const formattedContent = useAssemblyContent(content)

  return (
    <MathJax>
      <div className={className}>{formattedContent}</div>
    </MathJax>
  )
}
