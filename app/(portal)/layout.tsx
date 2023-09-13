import { Metadata } from 'next'
import { z } from 'zod'

import Container from '@/components/Container'
import Preview from '@/components/page/portal/Preview'
import StoreInitializer from '@/components/page/portal/StoreInitializer'

import { getLinks } from '@/actions/getLinks'
import { getCurrentUser } from '@/actions/getCurrentUser'

interface SettingLayoutProps {
  children: React.ReactNode
  preview: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Admin',
  description: 'Setting Your LinkOrchard'
}

const themeColorSchema = z.enum(['basic', 'blue-rose', 'lime']).catch('basic')

const currentUserSchema = z.object({
  name: z.string().nullable(),
  username: z.string().nullable(),
  customImage: z.string().nullable(),
  image: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  themeColor: themeColorSchema
})

type CurrentUser = z.infer<typeof currentUserSchema>
type SafeThemeColor = z.infer<typeof themeColorSchema>

const isValidCurrentUser = (user: unknown): user is CurrentUser => {
  return currentUserSchema.safeParse(user).success
}

const isValidThemeColor = (
  themeColor: unknown
): themeColor is SafeThemeColor => {
  return themeColorSchema.safeParse(themeColor).success
}

export default async function SettingLayout({ children }: SettingLayoutProps) {
  const currentUser = await getCurrentUser()
  const linkSetting = await getLinks()

  if (!isValidCurrentUser(currentUser)) {
    return <div>Something went wrong</div>
  }

  const themeColor = isValidThemeColor(currentUser?.themeColor)
    ? currentUser?.themeColor
    : 'basic'
  const adminSetting = {
    username: currentUser.username || currentUser.name,
    customImage: currentUser.customImage || currentUser.image,
    title: currentUser.title,
    description: currentUser.description,
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
