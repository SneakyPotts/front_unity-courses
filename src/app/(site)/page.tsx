import { CatalogContent } from '_content/CatalogContent'

import { getCoursesCatalog, getCoursesFilters } from '@http/courses/server'

import { RequestError } from '_ui/RequestError'

export default async function CoursesCatalog() {
  const [catalog, filters] = await Promise.all([getCoursesCatalog(), getCoursesFilters()])

  const isError = catalog.error || filters.error

  if (isError) return <RequestError message="Щось пішло не так..." />

  return (
    <CatalogContent
      data={catalog?.data}
      filters={filters.data}
    />
  )
}
