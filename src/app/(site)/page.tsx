import { TPageProps } from '@assets/types/globals'
import { getCoursesCatalog, getCoursesFilters } from '@http/courses/server'

import { RequestError } from '_ui/RequestError'

import { CatalogContent } from '_content/CatalogContent'

export default async function CoursesCatalog({ searchParams }: TPageProps) {
  const reqParams = () => {
    let res = []

    for (const key in searchParams) {
      const value = searchParams[key].split(',')
      res.push(...value.map((v) => `${key}=${v}`))
    }

    return res.join('&')
  }

  const [catalog, filters] = await Promise.all([getCoursesCatalog(reqParams()), getCoursesFilters()])

  const isError = catalog.error || filters.error

  if (isError) return <RequestError message="Щось пішло не так..." />

  return (
    <CatalogContent
      data={catalog?.data}
      filters={filters.data}
    />
  )
}
