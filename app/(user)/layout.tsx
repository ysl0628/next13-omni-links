import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Link Orchard',
  description: 'Branch Out with LinkOrchard'
}

export default function UserLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <section className="w-full h-full">{children}</section>
}
