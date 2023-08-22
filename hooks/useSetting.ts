import { create } from 'zustand'
import { produce } from 'immer'
import { AdminType, LinkType } from '@/types'
import { SafeUser } from '@/types/safe'

interface State {
  user: SafeUser | null
  admin: AdminType
  links: LinkType[] | null
}
interface SettingStore {
  user: State['user']
  admin: State['admin']
  links: State['links']
  update: (partial: Partial<State>) => void
}

const useSetting = create<SettingStore>((set) => ({
  user: null,
  admin: {
    customImage: null,
    title: null,
    description: null,
    themeColor: null
  },
  links: null,
  update: (partial) =>
    set(
      produce((state) => {
        if (partial.admin) {
          state.admin.customImage =
            partial.admin.customImage ?? state.admin.customImage
          state.admin.title = partial.admin.title ?? state.admin.title
          state.admin.description =
            partial.admin.description ?? state.admin.description
          state.admin.themeColor =
            partial.admin.themeColor ?? state.admin.themeColor
        }
        if (partial.links !== undefined) {
          state.links = partial.links
        }
      })
    )
}))

export default useSetting
