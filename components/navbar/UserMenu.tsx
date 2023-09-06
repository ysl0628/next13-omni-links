'use client'

import React, { Fragment } from 'react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Menu, Transition } from '@headlessui/react'

import Avatar from '../Avatar'
import MenuItem from './MenuItem'
import Divider from '../Divider'

interface UserMenuProps {
  avatarImage?: string | null
  username?: string | null
}

const UserMenu: React.FC<UserMenuProps> = ({ avatarImage, username }) => {
  const router = useRouter()

  return (
    <Menu as="div" className="relative w-10 h-10">
      {({ open, close }) => (
        <>
          <Menu.Button
            id="user-menu-button"
            className={`
                ${open ? '' : 'text-opacity-90'}
                          rounded-full 
                group inline-flex items-center text-base font-medium text-white 
                hover:shadow-md hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <Avatar src={avatarImage} />
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
                <div className="rounded-lg p-2 cursor-default text-md font-medium text-secondary-600">
                  @{username}
                </div>
                <Divider />
                <div className="flex flex-col gap-1 pt-2">
                  <MenuItem
                    label="開始我的 Link Orchard"
                    onClick={() => {
                      router.push('/portal/basic')
                      close()
                    }}
                  />
                  <MenuItem label="聯絡我們" onClick={() => {}} />
                  <Divider />
                  <MenuItem label="Log Out" onClick={() => signOut()} />
                </div>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}

export default UserMenu
