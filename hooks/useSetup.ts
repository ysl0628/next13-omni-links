import { current, produce } from 'immer'
import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'

import { LinkSetupType, UserSetup } from '@/types'

interface State {
  user: UserSetup | null | Record<string, string | null>
  links: LinkSetupType[] | null
}
interface NewLink extends Omit<LinkSetupType, 'id'> {
  [key: string]: any
}
interface SettingStore {
  user: State['user']
  links: State['links']
  initialSync: (partial: Partial<State>) => void
  update: (partial: Partial<State>) => void
  addLink: (link: LinkSetupType) => void
  removeLink: (linkId: string) => void
  updateLink: (linkId: string | undefined, newLink: NewLink | undefined) => void
  revertLinks: (oldLinks: LinkSetupType[] | null) => void
  revertUser: (oldUser: UserSetup | null) => void
}

const useSetup = createWithEqualityFn<SettingStore>(
  (set) => ({
    user: null,
    links: null,
    initialSync: (partial) =>
      set(
        produce((state) => {
          if (partial.user) {
            state.user = partial.user
          }
          if (partial.links) {
            state.links = partial.links
          }
        })
      ),
    update: (partial) =>
      set(
        produce((state) => {
          if (partial.user) {
            state.user.username = partial.user.username ?? state.user.username
            state.user.customImage =
              partial.user.customImage ?? state.user.customImage
            state.user.title = partial.user.title ?? state.user.title
            state.user.description =
              partial.user.description ?? state.user.description
            state.user.themeColor =
              partial.user.themeColor ?? state.user.themeColor
          }
          if (partial.links) {
            state.links = partial.links
            state.user.links = partial.links
          }
        })
      ),
    addLink: (newLink) =>
      set(
        produce((state) => {
          state.links = [newLink, ...(state.links || [])]
          state.user.links = [newLink, ...(state.user.links || [])]
        })
      ),
    removeLink: (linkId) =>
      set(
        produce((state) => {
          const newState = state.links?.filter(
            (l: LinkSetupType) => l.id !== linkId
          )
          state.links = newState
          state.user.links = newState
        })
      ),
    updateLink: (linkId, updatedLink) =>
      set(
        produce((state) => {
          const link = state.links?.find((l: LinkSetupType) => l.id === linkId)

          const userLink = state.user?.links?.filter(
            (l: LinkSetupType) => l.id === linkId
          )

          if (!link || !updatedLink) return

          const propertiesToUpdate = ['title', 'type', 'url', 'order']
          propertiesToUpdate.forEach((property) => {
            link[property] = updatedLink[property]
            userLink[property] = updatedLink[property]
          })
        })
      ),
    revertLinks: (oldLinks) =>
      set(
        produce((state) => {
          state.links = oldLinks
          state.user.links = oldLinks
        })
      ),
    revertUser: (oldUser) =>
      set(
        produce((state) => {
          state.user = oldUser
        })
      )
  }),
  shallow
)

export default useSetup
