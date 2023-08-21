import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/actions/getCurrentUser'

import prisma from '@/libs/prismadb'

export async function PUT(req: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) return NextResponse.error()

  const body = await req.json()

  const { title, description, customImage, themeColor, links } = body

  // 如果 links 的 order 不等於 index + 1，就更新拋錯誤，用 for loop
  for (let i = 0; i < links.length; i++) {
    if (links[i].order !== i + 1) {
      return new NextResponse('order is not correct', { status: 400 })
    }
  }

  const processedLinks = links.map((link: any) => {
    return {
      ...link,
      userId: currentUser.id,
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

  await prisma.link.deleteMany({
    where: {
      userId: currentUser.id
    }
  })

  const linkSettings = await prisma.link.createMany({
    data: processedLinks
  })

  return NextResponse.json({ adminSettings, linkSettings, message: 'success' })
}
