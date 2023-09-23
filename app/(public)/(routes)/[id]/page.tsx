import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getCurrentUser } from '@/actions/getCurrentUser'
import { getUserByUsername } from '@/actions/getUserByUsername'

import PublicClient from '@/components/page/public/PublicClient'

export const revalidate = 60

export function generateMetadata({
  params
}: {
  params: { id: string }
}): Metadata {
  return {
    title: `${params.id}`,
    alternates: {
      canonical: `https://linkorchard.com/${params.id}`
    }
  }
}

const Page = async ({ params }: { params: { id: string } }) => {
  const user = await getUserByUsername(params.id)
  const currentUser = await getCurrentUser()
  if (!user) {
    notFound()
  }

  return <PublicClient user={user} currentUser={currentUser} />
}

export default Page
