import React from 'react'

import Logo from './Logo'
import Container from '../Container'
import NavButtons from './NavButtons'
import UserButtons from './UserButtons'

const NavBar = () => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center w-full flex-grow justify-between gap-3 md:gap:0">
            <Logo />
            <NavButtons />
            <UserButtons />
          </div>
        </Container>
      </div>
    </div>
  )
}

export default NavBar
