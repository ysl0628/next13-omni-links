import { create } from 'zustand'
import { produce } from 'immer'
import { LinkType } from '@/types/common'

interface SettingStore {
  admin?: {
    customImage?: string | null
    title?: string | null
    description?: string | null
    themeColor?: string | null
  }
  links?: LinkType[] | null
  updateAdmin: (admin: SettingStore['admin']) => void
  updateLinks: (links: SettingStore['links']) => void
}

const useSetting = create<SettingStore>((set) => ({
  admin: {},
  links: [],
  updateAdmin: (admin) =>
    set(
      produce((state) => {
        state.admin = admin
      })
    ),
  updateLinks: (links) =>
    set(
      produce((state) => {
        state.links = links
      })
    )
}))

export default useSetting
