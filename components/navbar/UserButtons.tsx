'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import Button from '../Button'
import UserMenu from './UserMenu'
import { SafeUser } from '@/types/safe'

interface UserButtonsProps {
  isAdmin: boolean
  currentUser?: SafeUser | null
}

const UserButtons: React.FC<UserButtonsProps> = ({ currentUser, isAdmin }) => {
  const router = useRouter()
  const avatarImage = currentUser?.image
  const username = currentUser?.username || currentUser?.name

  return (
    <div className="flex flex-[0_0_auto] min-w-0 items-center gap-4">
      {currentUser ? (
        <>
          {isAdmin ? <Button label="發佈" onClick={() => {}} /> : null}
          <div
            // onClick={toggleOpen}
            className="
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          rounded-full 
          items-center 
          cursor-pointer 
          transition
          "
          >
            <div className="hidden md:block">
              <UserMenu avatarImage={avatarImage} username={username} />
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
