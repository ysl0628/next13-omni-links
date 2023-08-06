'use client'

import React from 'react'
import Image from 'next/image'

interface AvatarProps {
  src?: string | null
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      alt="avatar"
      className="rounded-full"
      height={40}
      width={40}
      src={src || '/images/placeholder.jpg'}
    />
  )
}

export default Avatar
