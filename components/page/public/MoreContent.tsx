'use client'

import { useRouter } from 'next/navigation'
import { Transition } from '@headlessui/react'
import { toast } from 'react-hot-toast'

import Button from '../../ui/Button'
import { useMore } from '@/hooks/useMore'

import { SafeUser } from '@/types/safe'

interface MoreContentProps {
  username: string
  currentUser: SafeUser | null
}

const MoreContent: React.FC<MoreContentProps> = ({ username, currentUser }) => {
  const router = useRouter()
  const open = useMore((store) => store.open)
  const toggle = useMore((store) => store.toggle)
  const linkUrl =
    process.env.NODE_ENV === 'development'
      ? `localhost:3000/${username}`
      : `${process.env.NEXT_PUBLIC_BASEURL}/${username}`

  const handleCopy = () => {
    navigator.clipboard.writeText(linkUrl)
    toast.success('已複製連結')
  }

  const handleLogin = () => {
    router.replace('/login')
  }

  const handleToPortal = () => {
    router.replace('/portal/basic')
  }

  return (
    <>
      {open && (
        <div
          className="fixed h-full inset-0 bg-black/30"
          aria-hidden="true"
          onClick={toggle}
        />
      )}
      <Transition
        as="div"
        show={open}
        enter="transform transition ease-in-out duration-300 sm:duration-500"
        enterFrom="opacity-0 translate-y-full"
        enterTo="opacity-100 translate-y-0"
        leave="transform transition ease-in-out duration-500 sm:duration-700"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-full"
        className="h-[20rem] overflow-hidden w-full absolute bottom-0 max-w-[30rem]"
      >
        <div className="h-full w-full absolute bottom-0 bg-white rounded-t-lg shadow-md">
          <div className="flex flex-col w-full justify-center p-8 gap-6">
            <div className="text-2xl w-full font-semibold text-center text-gray-700 dark:text-gray-100">
              Your Link
            </div>
            <input
              title="input"
              defaultValue={linkUrl}
              disabled
              className="px-2 py-3 rounded-md text-gray-500 border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 bg-info-50"
            />
            <Button
              label="Copy Link!"
              size="large"
              rounded="medium"
              onClick={handleCopy}
            />
            <Button
              label={currentUser ? '設定我的 Link Orchard' : '登入/註冊'}
              size="large"
              rounded="medium"
              color={currentUser ? 'secondary' : 'dark'}
              onClick={currentUser ? handleToPortal : handleLogin}
            />
          </div>
        </div>
      </Transition>
    </>
  )
}

export default MoreContent
