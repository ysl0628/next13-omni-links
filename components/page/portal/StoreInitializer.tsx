'use client'

import useSetup from '@/hooks/useSetup'
import { LinkSetupType, UserSetup } from '@/types'
import { useRef } from 'react'

interface StoreInitializerProps {
  userSetup: UserSetup | null
  linkSetup: LinkSetupType[] | null
}

const StoreInitializer = ({ userSetup, linkSetup }: StoreInitializerProps) => {
  const { initialSync } = useSetup((state) => state)

  const initialized = useRef(false)
  if (!initialized.current) {
    initialSync({ links: linkSetup, user: userSetup })
    initialized.current = true
  }
  return null
}

export default StoreInitializer
