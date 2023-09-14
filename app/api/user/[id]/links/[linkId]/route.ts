import { z } from 'zod'
import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/actions/getCurrentUser'

import prisma from '@/libs/prismadb'

export async function DELETE(
  req: Request,
  {
    params
  }: {
    params: { id: string; linkId: string }
  }
) {
  try {
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
  } catch (error) {
    return new NextResponse('Server Error', { status: 500 })
  }
}

const putValidate = z.object({
  title: z.string().max(15, '標題最多可輸入 15 字'),
  type: z.object({
    id: z.string(),
    label: z.string()
  }),
  url: z.string().url(),
  order: z.number()
})

export async function PUT(
  req: Request,
  {
    params
  }: {
    params: { id: string; linkId: string }
  }
) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) return new NextResponse('Unauthorized', { status: 401 })

    const body = await req.json()

    const { id, linkId } = params
    const { title, type, url, order } = body

    if (!id || !linkId) return new NextResponse('Bad Request', { status: 400 })

    const result = putValidate.safeParse(body)
    if (!result.success) {
      throw new z.ZodError(result.error.issues)
    }

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
  } catch (error) {
    if (error instanceof z.ZodError) {
      const message = error.errors.map((e) => e.message).join(', ')
      return new NextResponse(message, { status: 400 })
    }
    return new NextResponse('Server Error', { status: 500 })
  }
}
