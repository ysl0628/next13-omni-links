'use client'

import React from 'react'
import Image from 'next/image'

interface AvatarProps {
  src?: string | null
  size?: number
}

const Avatar: React.FC<AvatarProps> = ({ src, size }) => {
  return (
    <Image
      alt="avatar"
      className="rounded-full"
      height={size || 40}
      width={size || 40}
      src={src || '/images/placeholder.jpg'}
    />
  )
}

export default Avatar
