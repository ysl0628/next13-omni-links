'use client'

import useSetting from '@/hooks/useSetting'
import { AdminType, LinkType } from '@/types'
import { SafeUser } from '@/types/safe'
import { useRef } from 'react'

interface StoreInitializerProps {
  user: SafeUser | null
  adminSetting: AdminType
  linkSetting: LinkType[] | null
}

const StoreInitializer = ({
  user,
  adminSetting,
  linkSetting
}: StoreInitializerProps) => {
  const { update } = useSetting((state) => state)

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
