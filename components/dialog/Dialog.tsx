'use client'

import React, { ReactNode, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog } from '@headlessui/react'

interface DialogProps {
  children: ReactNode
  open: boolean
  title?: string
  handleClose?: () => void
}

const DialogWrapper = ({ children, open, handleClose, title }: DialogProps) => {
  const router = useRouter()

  const onDismiss = useCallback(() => {
    router.back()
  }, [router])

  const onClose = useCallback(() => {
    handleClose ? handleClose() : onDismiss()
  }, [handleClose, onDismiss])

  return (
    <Dialog
      open={open}
      className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/60"
      onClose={onClose}
    >
      <div className="fixed inset-0 flex items-center justify-center p-4 ">
        <Dialog.Panel className="w-full p-2 px-16 pb-8 max-w-lg rounded bg-white">
          {title && (
            <Dialog.Title className="text-2xl text-grey-600 font-semibold px-4 py-2 text-center">
              {title}
            </Dialog.Title>
          )}
          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default DialogWrapper
