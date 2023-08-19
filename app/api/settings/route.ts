import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/actions/getCurrentUser'

import prisma from '@/libs/prismadb'

export async function POST(req: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) return NextResponse.error()

  const body = await req.json()

  const { title, description, customImage, themeColor, links } = body

  const processedLinks = links.map((link: any, index: number) => {
    return {
      ...link,
      userId: currentUser.id,
      order: index + 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  })

  const adminSettings = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      title,
      description,
      customImage,
      themeColor,
      updatedAt: new Date()
    }
  })

  const linkSettings = await prisma.link.createMany({
    data: processedLinks
  })

  return NextResponse.json({ adminSettings, linkSettings })
}
