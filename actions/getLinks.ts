import { getCurrentUser } from './getCurrentUser'

import prisma from '@/libs/prismadb'

export async function getLinks() {
  const currentUser = await getCurrentUser()

  if (!currentUser) return null

  const links = await prisma.link.findMany({
    where: {
      userId: currentUser.id
    },
    orderBy: {
      order: 'asc'
    }
  })

  return links
}
