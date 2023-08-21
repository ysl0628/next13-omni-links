'use client'

import React, { Fragment, MutableRefObject } from 'react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Popover, Transition } from '@headlessui/react'

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
    <Popover className="relative w-10 h-10">
      {({ open, close }) => (
        <>
          <Popover.Button
            className={`
                ${open ? '' : 'text-opacity-90'}
                          rounded-full 
                group inline-flex items-center text-base font-medium text-white 
                hover:shadow-md hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <Avatar src={avatarImage} />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-10 mt-3 w-60 min-w-[10rem] -translate-x-3/4 transform px-4">
              <div className="overflow-hidden w-full flex flex-col rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative bg-white p-4 w-full flex flex-col gap-2">
                  <div className="-my-1 rounded-lg py-2 cursor-default text-md font-medium text-secondary-600">
                    @{username}
                  </div>
                  <Divider />
                  <div className="flex flex-col gap-5 pt-2">
                    <MenuItem
                      label="開始我的 Link Orchard"
                      onClick={() => {
                        router.push('/portal/basic')
                        close()
                      }}
                    />
                    <MenuItem label="聯絡我們" onClick={() => {}} />
                  </div>
                </div>
                <div className="bg-gray-50 p-4">
                  <MenuItem label="Log Out" onClick={() => signOut()} />
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

export default UserMenu
