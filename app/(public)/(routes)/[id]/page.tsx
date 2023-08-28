import React from 'react'

import { getCurrentUser } from '@/actions/getCurrentUser'
import { getUserByUsername } from '@/actions/getUserByUsername'

import PublicClient from '@/components/page/public/PublicClient'

const Page = async ({ params }: { params: { id: string } }) => {
  const user = await getUserByUsername(params.id)
  const currentUser = await getCurrentUser()

  return <PublicClient user={user} currentUser={currentUser} />
}

export default Page
