import { Dialog, Transition } from '@headlessui/react'
import React, { FC, Fragment } from 'react'

import ButtonLoader from '../ButtonLoader'

import { IoMdCloseCircle } from 'react-icons/io'

interface DialogComponentProps {
  isOpen: boolean
  title: string
  children: React.ReactNode
  submitLabel?: string
  isSubmitting?: boolean
  onClose: () => void
  onSubmit: () => void
}

const DialogComponent: FC<DialogComponentProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  children,
  isSubmitting,
  submitLabel = 'Submit'
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  {title}
                </Dialog.Title>
                <div
                  className="rounded-full hover:opacity-80 cursor-pointer absolute top-3 right-3"
                  onClick={onClose}
                >
                  <IoMdCloseCircle className="h-7 w-7 text-secondary-500" />
                </div>
                {children}

                <div className="mt-8 w-full">
                  <button
                    type="button"
                    disabled={isSubmitting}
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-primary-100 px-4 py-2 text-sm font-medium text-primary-900 hover:bg-primary-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                    onClick={onSubmit}
                  >
                    {isSubmitting ? <ButtonLoader /> : submitLabel}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default DialogComponent
