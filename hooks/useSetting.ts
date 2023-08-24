import { create } from 'zustand'
import { produce } from 'immer'
import { AdminSettingType, LinkSettingType } from '@/types'
import { SafeUser } from '@/types/safe'

interface State {
  user: SafeUser | null
  admin: AdminSettingType
  links: LinkSettingType[] | null
}
interface SettingStore {
  user: State['user']
  admin: State['admin']
  links: State['links']
  update: (partial: Partial<State>) => void
  addLink: (link: LinkSettingType) => void
}

const useSetting = create<SettingStore>((set) => ({
  user: null,
  admin: {
    username: '',
    customImage: '',
    title: '',
    description: '',
    themeColor: null
  },
  links: null,
  update: (partial) =>
    set(
      produce((state) => {
        if (partial.admin) {
          state.admin.username = partial.admin.username ?? state.admin.username
          state.admin.customImage =
            partial.admin.customImage ?? state.admin.customImage
          state.admin.title = partial.admin.title ?? state.admin.title
          state.admin.description =
            partial.admin.description ?? state.admin.description
          state.admin.themeColor =
            partial.admin.themeColor ?? state.admin.themeColor
        }
        if (partial.links) {
          state.links = partial.links
        }
        if (partial.user) {
          state.user = partial.user
        }
      })
    ),
  addLink: (link) =>
    set(
      produce((state) => {
        state.links?.push(link)
      })
    )
}))

export default useSetting
