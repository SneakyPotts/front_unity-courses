import { clientAuthFetch } from '@http/clientApi'
import type { TCertificates } from '@http/profile/type'
import { useQuery } from '@tanstack/react-query'

const getCertificates = ({ page_size = 4, page = 1 }: { page_size?: number; page?: number }) =>
  clientAuthFetch<TCertificates>(`/courses/certificate/?page_size=${page_size}&page=${page}`)

export function useQueryCertificates({ page_size, page }: { page_size?: number; page?: number }) {
  const list = useQuery({
    queryKey: ['certificates', page_size, page],
    queryFn: () => getCertificates({ page_size, page }),
  })

  return {
    list,
  }
}
