import { create } from 'zustand'
import { produce } from 'immer'

import { AdminSetupType, LinkSetupType } from '@/types'
import { SafeUser } from '@/types/safe'

interface State {
  user: SafeUser | null
  admin: AdminSetupType
  links: LinkSetupType[] | null
}
interface SettingStore {
  user: State['user']
  admin: State['admin']
  links: State['links']
  update: (partial: Partial<State>) => void
  addLink: (link: LinkSetupType) => void
  removeLink: (linkId: string) => void
  updateLink: (
    linkId: string | undefined,
    newLink: Omit<LinkSetupType, 'id'> | undefined
  ) => void
}

const useSetup = create<SettingStore>((set) => ({
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
    ),
  removeLink: (linkId) =>
    set(
      produce((state) => {
        state.links?.filter((l: LinkSetupType) => l.id !== linkId)
      })
    ),
  updateLink: (linkId, newLink) =>
    set(
      produce((state) => {
        const link = state.links?.find((l: LinkSetupType) => l.id === linkId)
        if (!link || !newLink) return

        if (link) {
          link.title = newLink.title
          link.type = newLink.type
          link.url = newLink.url
          link.order = newLink.order
        }
      })
    )
}))

export default useSetup
