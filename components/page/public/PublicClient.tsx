'use client'
import React from 'react'

import { useMore } from '@/hooks/useMore'
import { bgColors } from '@/constants/themeColors'

import Avatar from '@/components/Avatar'
import SocialLink from '@/components/page/portal/LinksSetup/SocialLink'
import MoreContent from './MoreContent'

import { Link } from '@prisma/client'
import { SafeUser } from '@/types/safe'
import { ResponseType } from '@/types'

import { CgMoreVerticalO } from 'react-icons/cg'

type FrontUserType = ResponseType & { links: Link[] }

interface PublicClientProps {
  user: FrontUserType | null
  currentUser: SafeUser | null
}

const PublicClient: React.FC<PublicClientProps> = ({ user, currentUser }) => {
  const toggleMore = useMore((store) => store.toggle)
  const avatarImage = user?.customImage
  const themeColor = user?.themeColor || 'basic'
  const bgColor = bgColors[themeColor]

  const combinedStyle = ` h-full w-full flex justify-center rounded-lg ${bgColor} relative`

  return (
    <div className={combinedStyle}>
      <div className="flex flex-col max-w-[30rem] w-full gap-6 justify-start items-center py-12 px-6 pt-24 relative ">
        <div
          className="absolute right-3 top-3 text-gray-600 hover:text-primary-800 cursor-pointer"
          onClick={toggleMore}
        >
          <CgMoreVerticalO size={28} />
        </div>
        <Avatar size={120} src={avatarImage} />
        <div className="text-2xl font-semibold text-gray-700 dark:text-gray-100">
          {user?.title || `我是${user?.username}`}
        </div>
        <div className="text-md text-justify text-gray-500 dark:text-gray-300">
          {user?.description || '這是我的簡介'}
        </div>
        <div className="flex flex-col w-full gap-6">
          {(user?.links || []).map((link) => (
            <SocialLink
              key={link.id}
              type={link.type.id}
              url={link.url}
              label={link.title}
            />
          ))}
        </div>
      </div>
      <MoreContent username={user?.username || ''} currentUser={currentUser} />
    </div>
  )
}

export default PublicClient
