import { getLinks } from '@/actions/getLinks'
import PortalContainer from '@/components/portal/PortalContainer'
import BasicSetting from '@/components/portal/BasicSetting'

const AdminPage = async () => {
  const links = await getLinks()

  return <PortalContainer mainComponent={BasicSetting} />
}

export default AdminPage
