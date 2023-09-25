import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getCurrentUser } from '@/actions/getCurrentUser'
import { getUserByUsername } from '@/actions/getUserByUsername'

import PublicClient from '@/components/page/public/PublicClient'

export const revalidate = 60

export async function generateMetadata({
  params
}: {
  params: { id: string }
}): Promise<Metadata> {
  const user = await getUserByUsername(params.id)

  return {
    title: `${params.id}`,
    description: `${user?.description}`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASEURL}/${params.id}`
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
