import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/actions/getCurrentUser'

import prisma from '@/libs/prismadb'
import { z } from 'zod'

const validate = z.object({
  title: z.string().max(15, '標題最多可輸入 15 字').optional(),
  description: z.string().max(300, '簡介內容最多可輸入 300 字').optional(),
  customImage: z.string().url().optional(),
  themeColor: z.enum(['basic', 'blue-rose', 'lime']).optional(),
  username: z.string().max(15).optional()
})

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser || currentUser.id !== params.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await req.json()

    const { title, description, customImage, themeColor, username } = body

    if (!title && !description && !customImage && !themeColor && !username) {
      return new NextResponse('請輸入要修改的內容', { status: 400 })
    }

    const result = validate.safeParse(body)

    if (!result.success) {
      throw new z.ZodError(result.error.issues)
    }

    const data = await prisma.user.update({
      where: {
        id: params.id
      },
      data: {
        title: title || currentUser.title,
        description: description || currentUser.description,
        customImage: customImage || currentUser.customImage,
        themeColor: themeColor || currentUser.themeColor,
        username: username || currentUser.username,
        updatedAt: new Date()
      }
    })

    return NextResponse.json({ data, message: 'success' })
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      const message = error.errors.map((e) => e.message).join(', ')
      return new NextResponse(message, { status: 400 })
    }

    if (error.code === 'P2002') {
      return new NextResponse('此使用者名稱已被使用', { status: 400 })
    }

    return new NextResponse('Server Error', { status: 500 })
  }
}
