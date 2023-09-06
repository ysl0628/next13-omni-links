import { Metadata } from 'next'

import StoreInitializer from '@/components/page/portal/StoreInitializer'
import { getCurrentUser } from '@/actions/getCurrentUser'
import { getLinks } from '@/actions/getLinks'
import { ThemeColorType } from '@/types'
import Container from '@/components/Container'
import Preview from '@/components/page/portal/Preview'

interface SettingLayoutProps {
  children: React.ReactNode
  preview: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Admin',
  description: 'Setting Your LinkOrchard'
}

const isValidThemeColor = (color: any): color is ThemeColorType =>
  ['basic', 'blue-rose', 'lime'].includes(color)

export default async function SettingLayout({
  children,
  preview
}: SettingLayoutProps) {
  const currentUser = await getCurrentUser()
  const linkSetting = await getLinks()

  const themeColor = isValidThemeColor(currentUser?.themeColor)
    ? currentUser?.themeColor
    : 'basic'
  const adminSetting = {
    username: currentUser?.username,
    customImage: currentUser?.customImage || currentUser?.image,
    title: currentUser?.title,
    description: currentUser?.description,
    themeColor: themeColor
  }

  return (
    <section className="w-full h-full flex pt-16 bg-grey-50 overflow-auto">
      <StoreInitializer
        adminSetting={adminSetting}
        linkSetting={linkSetting}
        user={currentUser}
      />
      <Container>
        <div className="flex gap-3 min-h-full max-w-screen-xl mx-auto">
          <div className="w-full min-w-[30rem] flex md:min-w-[40rem] flex-col py-4 gap-3 bg-white rounded shadow-md md:mx-16 my-12">
            {children}
          </div>
          <Preview />
        </div>
      </Container>
    </section>
  )
}
