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
      <div tw="relative flex items-center justify-center h-full w-full">
        <img
          src={user?.customImage || '/images/placeholder.jpg'}
          alt={user?.title || 'cover'}
          tw="object-cover"
        />
        <div tw="absolute flex bg-black opacity-50 inset-0 " />
        <div tw="absolute flex justify-center items-center inset-0 w-[900px] ">
          <div tw="text-white text-4xl flex font-bold mr-5 my-5">
            {user?.username}
          </div>
          <div tw="text-green-200 text-4xl flex font-bold mr-5 my-5">|</div>
          <div tw="text-orange-200 text-4xl flex font-bold my-5">
            Link Orchard
          </div>
        </div>
      </div>
    ),
    size
  )
}
