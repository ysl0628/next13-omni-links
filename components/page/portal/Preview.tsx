'use client'

import React from 'react'

import Avatar from '../../ui/Avatar'
import SocialLink from './LinksSetup/SocialLink'

import useSetup from '@/hooks/useSetup'

//https:lowbite.com/docs/components/device-mockups/

const Preview = () => {
  const { user, links } = useSetup((state) => ({
    user: state.user,
    links: state.links
  }))
  const avatarImage = user?.customImage
  const themeColor = user?.themeColor || 'basic'
  const bgClassName = `bg-gradient-${themeColor}`

  return (
    <div className="hidden lg:block self-center mx-16 my-12 relative border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-[rgba(24,_24,_7,_0.3)_50px_50px_50px_10px]">
      <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
      <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
      <div
        className={`rounded-[2rem] overflow-auto w-[272px] h-[572px] bg-white dark:bg-gray-800 ${bgClassName}`}
      >
        <div
          className={`flex flex-col gap-4 justify-start items-center py-12 px-6 h-full `}
        >
          <div className="w-[90px] h-[90px] rounded-full relative">
            <Avatar src={avatarImage} />
          </div>
          <div className="text-lg font-semibold text-gray-700 dark:text-gray-100">
            {user?.title || `我是${user?.username}`}
          </div>
          <div className="text-xs text-justify text-gray-500 dark:text-gray-300">
            {user?.description || '這是我的簡介'}
          </div>
          <div className="flex flex-col w-full gap-4">
            {(links || []).map((link) => (
              <SocialLink
                key={link?.id}
                type={link?.type?.id}
                url={link?.url}
                label={link?.title}
              />
            ))}
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
