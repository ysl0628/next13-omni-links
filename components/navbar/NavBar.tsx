import React from 'react'

import Logo from './Logo'
import Container from '../Container'
import NavButtons from './NavButtons'
import UserButtons from './UserButtons'
// import ThemeSwitcher from '../ThemeSwitcher'

const NavBar = ({ home }: { home?: boolean }) => {
  return (
    <div
      className={`fixed w-full 
      ${home ? 'bg-[#F7F8F9]' : 'bg-white shadow-sm'} 
      z-10`}
    >
      <div className={`py-4 ${home ? '' : 'border-b-[1px]'} `}>
        <Container>
          <div className="flex items-center w-full flex-grow justify-between gap-3 md:gap:0">
            <Logo />
            <NavButtons />
            {/* <ThemeSwitcher /> */}
            <UserButtons />
          </div>
        </Container>
      </div>
    </div>
  )
}

export default NavBar
