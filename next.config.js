/** @type {import('next').NextConfig} */

const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  }
]

const nextConfig = {
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'platform-lookaside.fbsbx.com',
      'lh3.googleusercontent.com',
      'res.cloudinary.com'
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders
      }
    ]
  }
}

module.exports = nextConfig
