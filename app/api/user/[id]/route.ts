import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/actions/getCurrentUser'

import prisma from '@/libs/prismadb'

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const currentUser = await getCurrentUser()

  if (!currentUser) return NextResponse.error()

  const body = await req.json()

  const { title, description, customImage, themeColor } = body

  const data = await prisma.user.update({
    where: {
      id: params.id
    },
    data: {
      title,
      description,
      customImage,
      themeColor,
      updatedAt: new Date()
    }
  })

  return NextResponse.json({ data, message: 'success' })
}
