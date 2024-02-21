import type { TFilterItem, TFilters } from '@http/courses/type'

export interface CatalogFiltersProps {
  filters?: TFilters
}

export interface FilterBlockProps extends TFilterItem {
  handler: (value: string | boolean) => void
  isRating?: boolean
  initialActive?: boolean
}
