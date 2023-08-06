'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import Button from '../Button'

const UserButtons = () => {
  const router = useRouter()
  return (
    <div className="flex flex-[0_0_auto] min-w-0 items-center gap-4">
      <Button
        label="Log In"
        variant="text"
        onClick={() => router.push('/login')}
      />
      <Button label="Sign Up" onClick={() => router.push('/signup')} />
    </div>
  )
}

export default UserButtons
