'use client'

import React from 'react'
import { User } from '@prisma/client'
import { useRouter, usePathname } from 'next/navigation'

import Button from '../Button'
import Avatar from '../Avatar'

interface UserButtonsProps {
  currentUser?: User | null
}

const UserButtons: React.FC<UserButtonsProps> = ({ currentUser }) => {
  const router = useRouter()
  const path = usePathname()
  const showUserButtons = path === '/'

  return (
    <div className="flex flex-[0_0_auto] min-w-0 items-center gap-4">
      {currentUser ? (
        <>
          <Button label="發佈" onClick={() => {}} />
          <div
            // onClick={toggleOpen}
            className="
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
          >
            <div className="hidden md:block">
              <Avatar />
            </div>
          </div>
        </>
      ) : (
        <>
          <Button
            label="Log In"
            variant="text"
            onClick={() => router.push('/login')}
          />
          <Button label="Sign Up" onClick={() => router.push('/signup')} />
        </>
      )}
    </div>
  )
}

export default UserButtons
