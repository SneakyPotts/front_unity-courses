import type { TFilterItem, TFilters } from '@http/courses/type'

export interface CatalogFiltersProps {
  filters?: TFilters
}

export interface FilterBlockProps extends TFilterItem {
  isRating?: boolean
  handler: (name: string, value: string | boolean) => void
  initialActive?: boolean
}
