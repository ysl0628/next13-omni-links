import { LinkType } from '@prisma/client'
import { IconType } from 'react-icons'
import { SafeUser } from './safe'

export interface IconTypeProps {
  label?: string | null
  icon: IconType | null
  style?: string
}

export interface LinkSetupType {
  id: string
  type: LinkType
  title: string
  url: string
  order?: number
}

export type ThemeColorType = 'basic' | 'blue-rose' | 'lime' | null

export interface AdminSetupType {
  username?: string | null
  customImage?: string | null
  title?: string | null
  description?: string | null
  themeColor?: ThemeColorType
}

export interface ResponseType {
  customImage?: string | null
  title?: string | null
  description?: string | null
  themeColor?: string | null
  id?: string | null
  type?: LinkType | null
  url?: string | null
  order?: number | null
  username?: string | null
}

export interface UserSetup extends SafeUser {
  links?: LinkSetupType[] | null
}
