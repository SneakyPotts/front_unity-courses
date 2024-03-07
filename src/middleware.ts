import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = cookies().get('accessToken')?.value

  if (!token) return Response.redirect(new URL('/', request.url))
}

export const config = {
  matcher: ['/home', '/my-courses', '/statistics'],
}
