import { getCurrentUser } from '@/actions/getCurrentUser'
import NavBar from '@/components/navbar/NavBar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Link Orchard',
  description: 'Branch Out with LinkOrchard'
}

export default async function UserLayout({
  children
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()
  return (
    <>
      <NavBar currentUser={currentUser} />
      <section className="w-full h-full">{children}</section>
    </>
  )
}
