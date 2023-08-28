import { getLinks } from '@/actions/getLinks'
import PortalContainer from '@/components/page/portal/PortalContainer'
import BasicSetup from '@/components/page/portal/BasicSetup'

const AdminPage = async () => {
  const links = await getLinks()

  return <PortalContainer mainComponent={BasicSetup} />
}

export default AdminPage
