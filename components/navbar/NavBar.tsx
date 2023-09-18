'use client'

import Logo from './Logo'
import Container from '../Container'
import NavLinks from './NavLinks'
import UserButtons from './UserButtons'
import { usePathname } from 'next/navigation'

import { SafeUser } from '@/types/safe'
import { Disclosure } from '@headlessui/react'

import Avatar from '../Avatar'
import MenuButton from './MenuButton'
import Divider from '../Divider'

// import ThemeSwitcher from '../ThemeSwitcher'

interface NavBarProps {
  // 這個型別是從 prisma schema 定義的，可以直接當作 type 來使用
  currentUser?: SafeUser | null
}

const navLinks = [
  {
    name: '基本設定',
    href: '/portal/basic'
  },
  {
    name: '連結設定',
    href: '/portal/links'
  }
]

const userLinks = [
  {
    name: '個人資料',
    href: '/portal/account'
  },
  {
    name: '開始我的 Link Orchard',
    href: '/portal'
  },
  {
    name: '聯絡我們',
    href: '/contact-us'
  },
  {
    name: '登出',
    href: '/logout'
  }
]

const NavBar: React.FC<NavBarProps> = ({ currentUser }) => {
  const path = usePathname()
  const isAdmin = path.includes('/portal')
  const avatarImage = currentUser?.customImage || currentUser?.image

  return (
    <Disclosure as="nav" className="bg-gray-400 fixed w-full z-50 shadow-md">
      {({ open }) => (
        <div className="mx-auto">
          <div className="relative flex h-16 items-center justify-between ">
            <div
              className={`fixed w-full 
            ${
              open
                ? 'bg-gray-400'
                : isAdmin
                ? 'bg-white shadow-sm'
                : 'bg-grey-50'
            }
              min-h-[4.5rem] z-10
              `}
            >
              <div
                className={`py-4 ${isAdmin && !open ? 'border-b-[1px]' : ''} `}
              >
                <Container>
                  <div className="flex items-center w-full flex-grow justify-between gap-3 md:gap:0">
                    <Logo />
                    {currentUser && isAdmin && <NavLinks />}
                    {/* <ThemeSwitcher /> */}
                    <MenuButton open={open} />
                    <UserButtons currentUser={currentUser} isAdmin={isAdmin} />
                  </div>
                </Container>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden pt-2">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navLinks.map((link) => (
                <Disclosure.Button
                  key={link.name}
                  as="a"
                  href={link.href}
                  className={`${
                    path === link.href
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-700 hover:text-white'
                  } block px-3 py-2 rounded-md text-base font-medium`}
                >
                  {link.name}
                </Disclosure.Button>
              ))}
            </div>
            <Divider color="gray-500" />
            <div className="px-5 py-3">
              <div className="flex items-center">
                <Avatar src={avatarImage} />
                <div className="ml-3">
                  <div className="text-lg font-medium text-gray-800">
                    @{currentUser?.username}
                  </div>
                </div>
              </div>
            </div>
            <div className="px-2 py-3">
              {userLinks.map((link) => (
                <Disclosure.Button
                  key={link.name}
                  as="a"
                  href={link.href}
                  className={`${
                    path === link.href
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-700 hover:text-white'
                  } block px-3 py-2 rounded-md text-base font-medium`}
                >
                  {link.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  )
}

export default NavBar
