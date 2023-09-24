'use client'

import React from 'react'
import Image from 'next/image'

import { rgbDataURL, staticBlurDataUrl } from '@/utils/staticBlurDataUrl'

interface AvatarProps {
  src?: string | null
  size?: number
  fill?: boolean
}

const Avatar: React.FC<AvatarProps> = ({ src, size, fill }) => {
  return (
    <Image
      alt="avatar"
      className="rounded-full object-cover"
      src={src || '/images/placeholder.jpg'}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      fill
      placeholder="blur"
      blurDataURL={staticBlurDataUrl()}
      priority
    />
  )
}

export default Avatar
