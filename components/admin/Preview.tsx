'use client'

import React from 'react'
import { SafeUser } from '@/types/safe'
import Avatar from '../Avatar'
import SocialLink from './social-link/SocialLink'

//https:lowbite.com/docs/components/device-mockups/
interface PreviewProps {
  currentUser?: SafeUser | null
}

const Preview: React.FC<PreviewProps> = ({ currentUser }) => {
  const avatarImage = currentUser?.customImage || currentUser?.image

  return (
    <div className="hidden md:block self-center mx-16 my-12 relative border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-[rgba(24,_24,_7,_0.3)_50px_50px_50px_10px] ">
      <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
      <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
      <div className="rounded-[2rem] overflow-auto w-[272px] h-[572px] bg-white dark:bg-gray-800">
        <div className="flex flex-col gap-4 justify-center items-center my-12 mx-6">
          <Avatar size={90} src={avatarImage} />
          <div className="text-lg font-semibold text-gray-700 dark:text-gray-100">
            username
          </div>
          <div className="text-xs text-justify text-gray-500 dark:text-gray-300">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur
            optio facilis deserunt molestias repellendus quaerat fugit
          </div>
          <div className="flex flex-col w-full gap-2">
            <SocialLink type="facebook" url={'123'} />
            <SocialLink type="youtube" url={'123'} />
            <SocialLink type="instagram" url={'123'} />
            <SocialLink type="twitter" label="111" url={'123'} />

            <SocialLink type="linkedin" url={'123'} />
            <SocialLink type="github" url={'123'} />
            <SocialLink type="spotify" url={'123'} />
            <SocialLink type="discord" url={'123'} />
            <SocialLink type="tiktok" url={'123'} />
            <SocialLink type="email" url={'123'} />
            <SocialLink type="custom" url={'123'} />
          </div>
        </div>
      </div>
    </div>
  )
}

const socialList: Record<string, string>[] = [
  {
    type: 'facebook',
    url: '123'
  },
  {
    type: 'twitter',
    url: '123'
  }
]

export default Preview
