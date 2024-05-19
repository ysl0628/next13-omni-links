import withAuth, { NextRequestWithAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export { default } from 'next-auth/middleware'

export async function middleware(request: NextRequestWithAuth) {
  if (request.nextUrl.pathname === '/portal') {
    return NextResponse.redirect(new URL('/portal/basic', request.url))
  }

  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const cspHeader = `
    default-src 'self' data:;
    script-src 'self' https: http: ${
      process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''
    } 'nonce-${nonce}' https://upload-widget.cloudinary.com/global/all.js https://widget.cloudinary.com/v2.0/global/all.js 'strict-dynamic';
    script-src-elem 'self' https: http: ${
      process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''
    } 'nonce-${nonce}' https://upload-widget.cloudinary.com/global/all.js https://widget.cloudinary.com/v2.0/global/all.js;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: avatars.githubusercontent.com platform-lookaside.fbsbx.com lh3.googleusercontent.com res.cloudinary.com;
    font-src 'self';
    frame-src 'self' https://upload-widget.cloudinary.com/;
    connect-src 'self' https://vitals.vercel-insights.com/v1/vitals https://faro-collector-prod-ap-southeast-1.grafana.net/collect/211d4c70d3ffbc4147c59c2e4631ea84 https://safebrowsing.googleapis.com/v4/threatMatches:find;
`

  const requestHeaders = new Headers()
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set(
    'Content-Security-Policy',
    cspHeader.replace(/\s{2,}/g, ' ').trim()
  )

  const response = (await withAuth(request)) || NextResponse.next()

  // Set the CSP headers on the response
  requestHeaders.forEach((value, key) => {
    response.headers.append(key, value)
  })

  return response
}

export const config = {
  matcher: ['/portal/:path*', '/account']
}
