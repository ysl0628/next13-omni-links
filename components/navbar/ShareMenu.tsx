'use client'

import React, { Fragment } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Menu, Transition } from '@headlessui/react'

import MenuItem from './MenuItem'

interface ShareMenuProps {
  username?: string | null
}

const ShareMenu: React.FC<ShareMenuProps> = ({ username }) => {
  const router = useRouter()

  const linkUrl =
    process.env.NODE_ENV === 'development'
      ? `localhost:3000/${username}`
      : `${process.env.NEXT_PUBLIC_BASEURL}/${username}`

  const handleCopy = () => {
    navigator.clipboard.writeText(linkUrl)
    toast.success('已複製連結')
  }

  return (
    <Menu as="div" className="relative">
      {({ open, close }) => (
        <>
          <Menu.Button
            id="user-menu-button"
            className={`
            ${open ? '' : 'text-opacity-90'}
            relative
            disabled:opacity-70
            disabled:cursor-not-allowed
            hover:opacity-80
            transition
            px-4 py-1.5 text-md font-semibold border-2
            bg-primary-500 border-primary-500 text-white
            rounded-lg
            cursor-pointer
            `}
          >
            發佈
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1">
                <div className="flex flex-col gap-1">
                  <Link
                    href={`/${username}`}
                    className="flex items-center p-3 transition duration-150 ease-in-out hover:bg-gray-50 rounded-lg cursor-pointer text-md font-medium text-secondary-600"
                  >
                    前往 {username} 個人頁面
                  </Link>
                  <MenuItem
                    label="複製我的個人頁面連結"
                    onClick={() => {
                      handleCopy()
                      close()
                    }}
                  />
                </div>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}

export default ShareMenu
