import { getCurrentUser } from '@/actions/getCurrentUser'
import { NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'

export async function DELETE({
  params
}: {
  params: { id: string; linkId: string }
}) {
  const currentUser = await getCurrentUser()
  if (!currentUser) return new NextResponse('Unauthorized', { status: 401 })

  const { id, linkId } = params

  if (!id || !linkId) return new NextResponse('Bad Request', { status: 400 })

  const data = await prisma.link.delete({
    where: {
      id: linkId
    }
  })

  return NextResponse.json({ data, message: 'success' })
}

export async function PUT(
  req: Request,
  {
    params
  }: {
    params: { id: string; linkId: string }
  }
) {
  const currentUser = await getCurrentUser()
  if (!currentUser) return new NextResponse('Unauthorized', { status: 401 })

  const body = await req.json()

  const { id, linkId } = params
  const { title, type, url, order } = body

  if (!title || !type || !url || !order || !id || !linkId)
    return new NextResponse('Bad Request', { status: 400 })

  const data = await prisma.link.update({
    where: {
      id: linkId
    },
    data: {
      order,
      title,
      type,
      url
    }
  })

  return NextResponse.json({ data, message: 'success' })
}
