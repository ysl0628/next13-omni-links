import '../styles/globals.css'
import type { Metadata } from 'next'
import { Oswald, Inter } from 'next/font/google'
import { headers } from 'next/headers'
import Script from 'next/script'

import Providers from '@/providers/Providers'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: '100'
})
const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  weight: '400'
})

// https://github.com/vercel/next.js/pull/53525

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASEURL || 'http://localhost:3000'
  ),
  title: {
    default: 'Link Orchard',
    template: '%s | Link Orchard'
  },
  description:
    'Branch Out with LinkOrchard：探索連結的果園，一次點擊就能找到所有你的精彩內容。將你的最佳連結栽種在這片網路果園中，並讓你的追蹤者在其中自由採摘。不只是 link in bio，更是你品牌故事的繽紛果園。'
}

interface RootLayoutProps {
  children: React.ReactNode
  auth: React.ReactNode
  admin: React.ReactNode
}

export default async function RootLayout({ children, auth }: RootLayoutProps) {
  const nonce = headers().get('x-nonce')

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${oswald.variable}`}>
        <Providers attribute="class" enableSystem>
          <main className="h-[100dvh] flex justify-center ">
            {children}
            {auth}
          </main>
        </Providers>
      </body>
      <Script strategy="afterInteractive" nonce={nonce || ''} />
    </html>
  )
}
