'use client'
import React from 'react'

import Logo from './Logo'
import Container from '../Container'
import NavButtons from './NavButtons'
import UserButtons from './UserButtons'
import { usePathname } from 'next/navigation'
// import ThemeSwitcher from '../ThemeSwitcher'

const NavBar = ({ home }: { home?: boolean }) => {
  const path = usePathname()
  const showUserButtons = path === '/'
  return (
    <div
      className={`fixed w-full 
      ${home ? 'bg-grey-50' : 'bg-white shadow-sm'} 
      min-h-[4.75rem]

      z-10`}
    >
      <div className={`py-4 ${home ? '' : 'border-b-[1px]'} `}>
        <Container>
          <div className="flex items-center w-full flex-grow justify-between gap-3 md:gap:0">
            <Logo />
            <NavButtons />
            {/* <ThemeSwitcher /> */}
            {showUserButtons && <UserButtons />}
          </div>
        </Container>
      </div>
    </div>
  )
}

export default NavBar
