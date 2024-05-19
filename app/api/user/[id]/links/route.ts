import { getCurrentUser } from '@/actions/getCurrentUser'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import prisma from '@/libs/prismadb'
import { checkUrlSafety, checkUrlValidity } from '@/app/api/utils'

const SAFE_BROWSING_API_KEY = 'AIzaSyD6zN5oo1l7u632iYTxpvP9dOM3NFiGLKo'

const postValidate = z.object({
  title: z.string().max(15, '標題最多可輸入 15 字'),
  type: z.object({
    id: z.string(),
    label: z.string()
  }),
  url: z.string().url(),
  order: z.number()
})

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser || params.id !== currentUser.id)
      return new NextResponse('Unauthorized', { status: 401 })

    const body = await req.json()

    const { title, type, url, order } = body

    const result = postValidate.safeParse(body)
    if (!result.success) {
      throw new z.ZodError(result.error.issues)
    }

    const isUrlSafe = await checkUrlSafety(url, SAFE_BROWSING_API_KEY)
    const isUrlValid = await checkUrlValidity(url)

    if (!isUrlValid)
      return NextResponse.json(
        { type: 'invalid', message: '非有效的 URL' },
        { status: 400 }
      )
    if (!isUrlSafe)
      return NextResponse.json(
        { type: 'invalid', message: '非安全的 URL' },
        { status: 400 }
      )

    // 檢查 order 有沒有重複
    const checkOrder = await prisma.link.findFirst({
      where: {
        order: order,
        userId: params.id
      }
    })

    if (checkOrder)
      return new NextResponse('order is duplicate', { status: 400 })

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
    if (error instanceof z.ZodError) {
      const message = error.errors.map((e) => e.message).join(', ')
      return new NextResponse(message, { status: 400 })
    }
    return new NextResponse('Server Error', { status: 500 })
  }
}

const patchValidate = z.array(
  z.object({
    id: z.string(),
    order: z.number(),
    type: z.object({
      id: z.string(),
      label: z.string()
    }),
    title: z.string().max(15, '標題最多可輸入 15 字'),
    url: z.string().url()
  }),
  {
    required_error: 'links is empty'
  }
)

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser || currentUser.id !== params.id)
      return new NextResponse('Unauthorized', { status: 401 })

    if (!params.id) {
      return new NextResponse('User ID is required', { status: 400 })
    }

    const body = await req.json()

    const { links } = body

    const result = patchValidate.safeParse(links)
    if (!result.success) {
      throw new z.ZodError(result.error.issues)
    }
    const updatedLinks = []

    for (const link of links) {
      const updatedLink = await prisma.link.update({
        where: {
          id: link.id
        },
        data: {
          order: link.order
        }
      })
      // 升冪排序
      updatedLinks.push(updatedLink)
    }

    // console.log('updatedLinks', updatedLinks)

    return NextResponse.json({ data: updatedLinks, message: 'success' })
  } catch (error) {
    console.log(error)
    if (error instanceof z.ZodError) {
      const message = error.errors.map((e) => e.message).join(', ')
      return new NextResponse(message, { status: 400 })
    }
    return new NextResponse('Server Error', { status: 500 })
  }
}
