'use client'

import useSetup from '@/hooks/useSetup'
import { LinkSetupType } from '@/types'
import { SafeUser } from '@/types/safe'
import { useRef } from 'react'

interface StoreInitializerProps {
  userSetup: SafeUser | null
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
