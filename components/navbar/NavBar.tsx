'use client'

import { signOut } from 'next-auth/react'
import { PropsWithChildren, useState } from 'react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import Skeleton from 'react-loading-skeleton'

import Logo from './Logo'
import Container from '../ui/Container'
// import NavLinks from './NavLinks'
// import UserButtons from './UserButtons'

import { SafeUser } from '@/types/safe'
import { Disclosure } from '@headlessui/react'

import Avatar from '../ui/Avatar'
import MenuButton from './MenuButton'
import Divider from '../ui/Divider'
import 'react-loading-skeleton/dist/skeleton.css'

// const UserButtons = lazy(() => import('./UserButtons'))
// const NavLinks = lazy(() => import('./NavLinks'))
const UserButtons = dynamic(() => import('./UserButtons'), {
  loading: () => <Skeleton width={125} height={40} />
})
const NavLinks = dynamic(() => import('./NavLinks'), {
  loading: () => (
    <Skeleton
      height={32}
      width={64}
      count={2}
      inline
      wrapper={SuspenseWrapper}
    />
  )
})

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
  }
]

const publicLinks = [
  {
    name: '聯絡我們',
    href: '/contact-us'
  },
  {
    name: '登入',
    href: '/login'
  },
  {
    name: '註冊',
    href: '/signup'
  }
]

const NavBar: React.FC<NavBarProps> = ({ currentUser }) => {
  const [full, setFull] = useState(false)
  const path = usePathname()
  const isAdmin = path.includes('/portal') || path.includes('/account')
  const avatarImage = currentUser?.customImage || currentUser?.image

  const menuLinks = currentUser ? userLinks : publicLinks

  return (
    <Disclosure
      id="disclosure"
      as="nav"
      className={`fixed w-full z-10 ${full ? 'h-full' : ''}`}
    >
      {({ open }) => {
        return (
          <div className={`bg-gray-200 mx-auto ${open ? 'h-full' : ''}`}>
            <div className="relative flex h-16 items-center justify-between ">
              <div
                className={`fixed w-full px-4
            ${
              open
                ? 'bg-gray-200'
                : isAdmin
                ? 'bg-white shadow-sm'
                : 'bg-grey-50'
            }
              min-h-[4rem] z-10 p-3.5
              ${isAdmin && !open ? 'border-b-[1px]' : ''}
              `}
              >
                <Container>
                  <div className="flex items-center w-full flex-grow justify-between gap-3 md:gap:0">
                    <Logo />

                    {currentUser && isAdmin && <NavLinks />}
                    {/* <ThemeSwitcher /> */}
                    <MenuButton open={open} setFull={setFull} />
                    <UserButtons currentUser={currentUser} isAdmin={isAdmin} />
                  </div>
                </Container>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden pt-2 h-full">
              {isAdmin && (
                <>
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
                  <Divider color="bg-gray-500/50" />
                </>
              )}
              {currentUser && (
                <div className="px-5 py-3">
                  <div className="flex items-center">
                    <div className="w-[40px] h-[40px] rounded-full relative">
                      <Avatar src={avatarImage} />
                    </div>
                    <div className="ml-3">
                      <div className="text-lg font-medium text-gray-800">
                        @{currentUser?.username}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="px-2 py-3">
                {menuLinks.map((link) => (
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
                <Disclosure.Button
                  className="text-gray-600 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => signOut({ callbackUrl: '/' })}
                >
                  登出
                </Disclosure.Button>
              </div>
            </Disclosure.Panel>
          </div>
        )
      }}
    </Disclosure>
  )
}

const SuspenseWrapper = ({ children }: PropsWithChildren<unknown>) => {
  return <span className=" mr-4 ">{children}</span>
}

export default NavBar
