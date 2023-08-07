import Link from 'next/link'
import React from 'react'
import { IconType } from 'react-icons'
import { iconType } from '@/constants/linkMapping'

export interface SocialLinkProps {
  label?: string
  type: string
  url?: string
  customStyle?: string
  icon?: IconType
}

const SocialLink = ({
  label,
  type,
  url,
  icon,
  customStyle
}: SocialLinkProps) => {
  const Icon = icon || iconType[type]?.icon
  const style = customStyle || iconType[type]?.style
  const socialLabel = iconType[type]?.label

  return (
    <Link className="w-full " href={url || '/'}>
      <div
        className={`px-4 py-1.5 flex gap-2 justify-center items-center w-full text-sm font-medium border-2 rounded ${style} hover:shadow-md`}
      >
        {Icon && (
          <div className="flex justify-center items-center">
            <Icon size={24} />
          </div>
        )}
        <div>{label ? label : socialLabel || 'My Link'}</div>
      </div>
    </Link>
  )
}

export default SocialLink
