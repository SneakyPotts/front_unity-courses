import type { TFilterBlock, TFilters } from '@http/courses/type'

export interface CatalogFiltersProps {
  filters?: TFilters
  handler: (name: string, value: string | boolean) => void
  reset: () => void
}

export interface FilterBlockProps extends TFilterBlock {
  handler: (value: string | boolean) => void
  isRating?: boolean
  initialActive?: boolean
}
