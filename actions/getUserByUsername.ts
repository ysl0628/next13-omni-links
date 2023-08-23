import prisma from '@/libs/prismadb'

export async function getUserByUsername(username: string) {
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
      }
    })

    return {
      username: user.username,
      title: user.title,
      description: user.description,
      links: links
    }
  } catch (error) {
    return null
  }
}
