import { getCurrentUser } from '@/actions/getCurrentUser'
import { NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) return new NextResponse('Unauthorized', { status: 401 })

    const body = await req.json()

    const { title, type, url, order } = body

    const data = await prisma.link.create({
      data: {
        title,
        type,
        url,
        order,
        userId: params.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    return NextResponse.json({ data, message: 'success' })
  } catch (error) {
    return NextResponse.error()
  }
}
