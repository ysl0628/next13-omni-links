import { Metadata } from 'next'
import { z } from 'zod'

import NavBar from '@/components/navbar/NavBar'
import Preview from '@/components/page/portal/Preview'
import Container from '@/components/ui/Container'
import StoreInitializer from '@/components/page/portal/StoreInitializer'

import { getLinks } from '@/actions/getLinks'
import { getCurrentUser } from '@/actions/getCurrentUser'

interface PortalLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true
  }
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

export default async function PortalLayout({ children }: PortalLayoutProps) {
  const currentUser = await getCurrentUser()
  const linkSetup = await getLinks()

  if (!isValidCurrentUser(currentUser)) {
    throw new Error('Invalid User')
  }

  const themeColor = isValidThemeColor(currentUser?.themeColor)
    ? currentUser?.themeColor
    : 'basic'
  const userSetup = {
    ...currentUser,
    username: currentUser.username || currentUser.name,
    customImage: currentUser.customImage || currentUser.image,
    title: currentUser.title,
    description: currentUser.description,
    themeColor: themeColor,
    links: linkSetup
  }

  return (
    <>
      <NavBar currentUser={currentUser} />
      <section className="w-full h-full flex pt-16 bg-grey-50 overflow-auto">
        <StoreInitializer userSetup={userSetup} linkSetup={linkSetup} />
        <Container>
          <div className="flex lg:gap-3 justify-center min-h-full max-w-screen-xl mx-auto">
            <div className="w-full flex min-w-full lg:min-w-[60%] flex-col py-4 gap-3 bg-white rounded shadow-md xs:mx-16 xs:my-8 md:my-12 my-0 ">
              {children}
            </div>
            <Preview />
          </div>
        </Container>
      </section>
    </>
  )
}
