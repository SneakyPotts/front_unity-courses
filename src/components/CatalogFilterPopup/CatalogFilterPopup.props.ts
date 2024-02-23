import { Dispatch, ReactNode, SetStateAction } from 'react'

import type { TFilters } from '@http/courses/type'

export interface CatalogFilterPopupProps {
  filters?: TFilters
  handler: (name: string, value: string | boolean) => void
  reset: () => void
}

export interface FilterActiveTagsProps {
  activeTags: TActiveTag[]
  setActiveTags: Dispatch<SetStateAction<TActiveTag[]>>
  handleRemove: (name: string, value: string) => void
  filters: TFilters
}

export type TActiveTag = {
  title: string | ReactNode
  name: string
  value: string
}
