import React from 'react'

import { getUserByUsername } from '@/actions/getUserByUsername'

import Avatar from '@/components/Avatar'
import SocialLink from '@/components/portal/social-link/SocialLink'

import { bgColors } from '@/constants/themeColors'
import { CgMoreVerticalO } from 'react-icons/cg'

const Page = async ({ params }: { params: { id: string } }) => {
  const user = await getUserByUsername(params.id)
  const avatarImage = user?.customImage
  const themeColor = user?.themeColor || 'basic'
  const bgColor = bgColors[themeColor]

  const combinedStyle = `pt-[4.5rem] h-full w-full flex justify-center rounded-lg ${bgColor} bg-gradient-to-tl from-gray-200 to-gray-50`

  return (
    <div className={combinedStyle}>
      <div className="flex flex-col max-w-[30rem] w-full gap-6 justify-start items-center py-12 px-6 pt-24 relative ">
        <div className="absolute right-0 top-0">
          <CgMoreVerticalO size={32} />
        </div>
        <Avatar size={120} src={avatarImage} />
        <div className="text-2xl font-semibold text-gray-700 dark:text-gray-100">
          {user?.title || `我是${user?.username}`}
        </div>
        <div className="text-md text-justify text-gray-500 dark:text-gray-300">
          {user?.description || '這是我的簡介'}
        </div>
        <div className="flex flex-col w-full gap-2">
          {(user?.links || []).map((link) => (
            <SocialLink
              key={link.id}
              type={link.type.id}
              url={link.url}
              label={link.title}
            />
          ))}
          {/* <SocialLink type="facebook" url={'123'} />
            <SocialLink type="youtube" url={'123'} />
            <SocialLink type="instagram" url={'123'} />
            <SocialLink type="twitter" label="111" url={'123'} />

            <SocialLink type="linkedin" url={'123'} />
            <SocialLink type="github" url={'123'} />
            <SocialLink type="spotify" url={'123'} />
            <SocialLink type="discord" url={'123'} />
            <SocialLink type="tiktok" url={'123'} />
            <SocialLink type="email" url={'123'} />
            <SocialLink type="website" url={'123'} /> */}
        </div>
      </div>
    </div>
  )
}

export default Page
