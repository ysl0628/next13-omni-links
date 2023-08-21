import { getLinks } from '@/actions/getLinks'
import SettingContainer from '@/components/admin/SettingContainer'
import BasicSetting from '@/components/admin/BasicSetting'

const AdminPage = async () => {
  const links = await getLinks()
  console.log(links)

  return <SettingContainer mainComponent={BasicSetting} />
}

export default AdminPage
