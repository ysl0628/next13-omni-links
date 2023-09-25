import { ImageResponse } from 'next/server'
import { getUserByUsername } from '@/actions/getUserByUsername'

export const size = {
  width: 900,
  height: 450
}

export const contentType = 'image/png'

export const runtime = 'edge'

export default async function Image() {
  const image = await fetch(
    new URL('public/images/link-orchard-logo.png', import.meta.url)
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          background: '#f6f6f6',
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <img width="633" height="96" src={image} alt="opengraph-image" />
      </div>
    ),
    {
      width: 1200,
      height: 630
    }
  )
}
