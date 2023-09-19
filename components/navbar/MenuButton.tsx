import { Disclosure } from '@headlessui/react'
import React, { Dispatch, SetStateAction } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { GrClose } from 'react-icons/gr'

const MenuButton = ({
  open,
  setFull
}: {
  open: boolean
  setFull: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <div className="flex items-center sm:hidden">
      <Disclosure.Button
        className="items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white "
        onClick={() => setFull(!open)}
      >
        <span className="sr-only">Open main menu</span>
        {open ? (
          <GrClose className="block h-6 w-6" aria-hidden="true" />
        ) : (
          <GiHamburgerMenu className="block h-6 w-6" aria-hidden="true" />
        )}
      </Disclosure.Button>
    </div>
  )
}

export default MenuButton
