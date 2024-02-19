import { getCoursesCatalog } from '@http/courses/server'

import { RequestError } from '_ui/RequestError'

import { CatalogContent } from './catalog.content'

export default async function CoursesCatalog() {
  const { data, error } = await getCoursesCatalog()

  console.log('catalog', { data, error })

  if (error) return <RequestError message="Щось пішло не так..." />

  return <CatalogContent data={data} />
}
