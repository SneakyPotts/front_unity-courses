import type { TCourse } from '@http/courses/type'

export interface CourseCatalogItemProps extends Omit<TCourse, 'users' | 'format'> {
  isCertified?: boolean
}
