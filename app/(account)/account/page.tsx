import { Metadata } from 'next'
import { getCurrentUser } from '@/actions/getCurrentUser'

import NavBar from '@/components/navbar/NavBar'
import Divider from '@/components/ui/Divider'
import Container from '@/components/ui/Container'
import LabelText from '@/components/ui/LabelText'
import BuildingState from '@/components/BuildingState'
import EditUsername from '@/components/page/account/EditUsername'

let enable = true

export const metadata: Metadata = {
  title: 'Account',
  description: 'Setup your account'
}
const PageAccount = async () => {
  const currentUser = await getCurrentUser()
  const userId = currentUser?.id

  if (!enable) {
    return <BuildingState />
  }

  const accountInfos = [
    {
      label: '名稱',
      text: currentUser?.name || ''
    },
    {
      label: 'Email',
      text: currentUser?.email || ''
    },
    {
      label: '加入日期',
      text: currentUser?.createdAt || ''
    }
  ]

  return (
    <>
      <NavBar currentUser={currentUser} />
      <section className="w-full h-full flex pt-16 bg-grey-50 overflow-auto">
        <Container>
          <div className="flex lg:gap-3 justify-center min-h-full md:max-w-screen-xl w-full mx-auto">
            <div className="w-full flex min-w-full sm:min-w-[90%] md:min-w-[90%] lg:min-w-[60%] flex-col py-4 gap-3 bg-white rounded shadow-md sm:mx-16 md:mx-12 md:my-12 sm:my-6 ">
              <div className="text-2xl sm:text-3xl font-semibold px-6 p-2 text-grey-600 divide-y">
                帳號設定
              </div>
              <Divider />
              <div className="flex flex-col gap-3 px-6 py-2">
                {accountInfos.map((info, index) => (
                  <LabelText key={index} label={info.label} text={info.text} />
                ))}
              </div>
              <Divider />
              <EditUsername
                username={currentUser?.username || ''}
                userId={userId}
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
export default PageAccount
