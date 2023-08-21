'use client'

import Logo from './Logo'
import Container from '../Container'
import NavLinks from './NavLinks'
import UserButtons from './UserButtons'
import { usePathname } from 'next/navigation'

import { SafeUser } from '@/types/safe'
// import ThemeSwitcher from '../ThemeSwitcher'

interface NavBarProps {
  // 這個型別是從 prisma schema 定義的，可以直接當作 type 來使用
  currentUser?: SafeUser | null
}

const NavBar: React.FC<NavBarProps> = ({ currentUser }) => {
  const path = usePathname()
  const isAdmin = path.includes('/setting')

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
            {currentUser && isAdmin && <NavLinks />}
            {/* <ThemeSwitcher /> */}
            <UserButtons currentUser={currentUser} isAdmin={isAdmin} />
          </div>
        </Container>
      </div>
    </div>
  )
}

export default NavBar
