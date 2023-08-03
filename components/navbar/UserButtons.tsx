'use client'

import React from 'react'
import Button from '../Button'

const UserButtons = () => {
  return (
    <div className="flex flex-[0_0_auto] min-w-0 items-center gap-4">
      <Button label="Log In" text onClick={() => console.log('Log In')} />
      <Button label="Sign Up" onClick={() => {}} />
    </div>
  )
}

export default UserButtons
