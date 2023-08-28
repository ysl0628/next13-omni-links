'use client'

import useSetup from '@/hooks/useSetup'
import { AdminSetupType, LinkSetupType } from '@/types'
import { SafeUser } from '@/types/safe'
import { useRef } from 'react'

interface StoreInitializerProps {
  user: SafeUser | null
  adminSetting: AdminSetupType
  linkSetting: LinkSetupType[] | null
}

const StoreInitializer = ({
  user,
  adminSetting,
  linkSetting
}: StoreInitializerProps) => {
  const { update } = useSetup((state) => state)

  // 如果 adminSetting.themeColor 是 null，就給他預設值
  if (!adminSetting.themeColor) {
    adminSetting.themeColor = 'basic'
  }

  const initialized = useRef(false)
  if (!initialized.current) {
    update({ admin: adminSetting, links: linkSetting, user })
    initialized.current = true
  }
  return null
}

export default StoreInitializer
