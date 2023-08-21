import { Metadata } from 'next'

import StoreInitializer from '@/components/portal/StoreInitializer'
import { getCurrentUser } from '@/actions/getCurrentUser'
import { getLinks } from '@/actions/getLinks'

interface SettingLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Admin',
  description: 'Setting Your LinkOrchard'
}

export default async function SettingLayout({ children }: SettingLayoutProps) {
  const currentUser = await getCurrentUser()
  const linkSetting = await getLinks()
  const adminSetting = {
    customImage: currentUser?.customImage || currentUser?.image,
    title: currentUser?.title,
    description: currentUser?.description,
    themeColor: currentUser?.themeColor
  }

  return (
    <section className="w-full h-full flex pt-2.5 bg-grey-50 overflow-auto">
      <StoreInitializer adminSetting={adminSetting} linkSetting={linkSetting} />
      {children}
    </section>
  )
}
