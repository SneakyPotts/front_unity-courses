'use client'

import parse, { type Element, type HTMLReactParserOptions } from 'html-react-parser'
import React, { useMemo } from 'react'

import MoleculeStructure from '@components/MoleculeStructure/MoleculeStructure'

export function useAssemblyContent(content?: string) {
  const caffeine = 'CN1C=NC2=C1C(=O)N(C(=O)N2C)'
  const aspirin = 'CC(=O)Oc1ccccc1C(=O)O'
  const LSD = 'CCN(CC)C(=O)[C@H]1CN([C@@H]2Cc3c[nH]c4c3c(ccc4)C2=C1)C'

  return useMemo(() => {
    const options: HTMLReactParserOptions = {
      replace: (domNode) => {
        const element = domNode as Element

        if (element.attribs?.id?.includes('him') && element.children.length === 1 && element.children[0].type === 'text') {
          return (
            <MoleculeStructure
              id={element.attribs?.id}
              structure={element.children[0].data}
              width={350}
              height={300}
              svgMode
            />
          )
        }
      },
    }

    return content ? parse(content, options) : null
  }, [content])
}
