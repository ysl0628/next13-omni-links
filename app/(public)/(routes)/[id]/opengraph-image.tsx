import { ImageResponse } from 'next/server'
import { getUserByUsername } from '@/actions/getUserByUsername'

export const size = {
  width: 900,
  height: 450
}
export const runtime = 'nodejs'

export const contentType = 'image/png'

export default async function Image({ params }: { params: { id: string } }) {
  const user = await getUserByUsername(params.id)

  return new ImageResponse(
    (
      <div tw="relative flex items-center justify-center">
        <img
          src={user?.customImage || '/images/placeholder.jpg'}
          alt={user?.title || 'cover'}
          tw="object-cover"
        />
        <div tw="absolute flex bg-black opacity-50 inset-0 " />
        <div tw="absolute flex items-center top-2 w-full ">
          <p tw="text-white text-4xl flex font-bold m-5">{user?.title}</p>
          <p tw="text-indigo-200 text-xl flex font-bold m-5">
            {user?.username}
          </p>
          <p tw="text-purple-200 text-xl flex font-bold m-5">
            {user?.updatedAt?.toDateString()}
          </p>
        </div>
      </div>
    ),
    size
  )
}
