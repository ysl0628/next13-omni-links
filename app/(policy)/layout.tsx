import { getCurrentUser } from '@/actions/getCurrentUser'
import NavBar from '@/components/navbar/NavBar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'Link Orchard'
  }
}

export default async function PolicyLayout({
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
