import { Metadata } from 'next'

import LinksSetup from '@/components/page/portal/LinksSetup/LinksSetup'

export const metadata: Metadata = {
  title: 'Link Setup',
  description: 'Setup your links'
}

const LinksSetupPage = () => {
  return <LinksSetup />
}

export default LinksSetupPage
