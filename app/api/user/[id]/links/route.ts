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

    // 檢查型別
    if (typeof title !== 'string')
      return new NextResponse('title must be string ', { status: 400 })

    if (type.id === 'default')
      return new NextResponse('type must select ', { status: 400 })

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
    return console.log(error)
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) return new NextResponse('Unauthorized', { status: 401 })

    const body = await req.json()

    const { links } = body

    // const data = []
    // for (const link of links) {
    //   const {id,  order} = link

    //   const update = await prisma.link.update({
    //     where: {
    //       id
    //     },
    //     data: {
    //       order,
    //       updatedAt: new Date()
    //     }
    //   })

    //   data.push(update)
    // }

    const data = await prisma.user.update({
      where: {
        id: params.id
      },
      data: {
        links: {
          set: links
        }
      }
    })

    return NextResponse.json({ data, message: 'success' })
  } catch (error) {
    return console.log(error)
  }
}
