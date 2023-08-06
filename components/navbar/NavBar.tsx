'use client'

import React from 'react'

import Logo from './Logo'
import Container from '../Container'
import NavLinks from './NavLinks'
import UserButtons from './UserButtons'
import { usePathname } from 'next/navigation'
// import ThemeSwitcher from '../ThemeSwitcher'

const NavBar = () => {
  const path = usePathname()
  const isAdmin = path.includes('/admin')

  return (
    <div
      className={`fixed w-full 
      ${isAdmin ? 'bg-white shadow-sm' : 'bg-grey-50'} 
      min-h-[4.5rem]

      z-10`}
    >
      <div className={`py-4 ${isAdmin ? 'border-b-[1px]' : ''} `}>
        <Container>
          <div className="flex items-center w-full flex-grow justify-between gap-3 md:gap:0">
            <Logo />
            <NavLinks />
            {/* <ThemeSwitcher /> */}
            <UserButtons />
          </div>
        </Container>
      </div>
    </div>
  )
}

export default NavBar
