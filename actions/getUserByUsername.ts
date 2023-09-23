import prisma from '@/libs/prismadb'
import { cache } from 'react'

export const revalidate = 60 * 60

export const getUserByUsername = cache(async (username: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username
      }
    })

    if (!user) return null

    const links = await prisma.link.findMany({
      where: {
        userId: user.id
      },
      orderBy: {
        order: 'desc'
      }
    })

    return {
      username: user.username,
      title: user.title,
      themeColor: user.themeColor,
      customImage: user.customImage || user.image,
      description: user.description,
      links: links,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
  } catch (error) {
    return null
  }
})
