import { Metadata } from 'next'
import BasicSetup from '@/components/page/portal/BasicSetup'

export const metadata: Metadata = {
  title: 'Basic Setup',
  description: 'Setup your basic info'
}

const BasicSetupPage = async () => {
  return <BasicSetup />
}

export default BasicSetupPage
