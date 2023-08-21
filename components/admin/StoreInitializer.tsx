'use client'

import useSetting from '@/hooks/useSetting'
import { GetAdminType, LinkType } from '@/types/common'
import { useRef } from 'react'

interface StoreInitializerProps {
  adminSetting: GetAdminType
  linkSetting: LinkType[] | null
}

const StoreInitializer = ({
  adminSetting,
  linkSetting
}: StoreInitializerProps) => {
  const { updateAdmin, updateLinks } = useSetting((state) => state)

  const initialized = useRef(false)
  if (!initialized.current) {
    updateAdmin(adminSetting)
    updateLinks(linkSetting)
    initialized.current = true
  }
  return null
}

export default StoreInitializer
