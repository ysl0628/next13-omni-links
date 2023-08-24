import { socialType } from '@/constants/linkMapping'
import { LinkType } from '@prisma/client'
import { IconType } from 'react-icons'

export interface IconTypeProps {
  label?: string | null
  icon: IconType | null
  style?: string
}

export interface LinkSettingType {
  id: string
  type: LinkType
  title: string
  url: string
  order?: number
}

export type ThemeColorType = 'basic' | 'blue-rose' | 'lime' | null

export interface AdminSettingType {
  username?: string
  customImage?: string
  title?: string
  description?: string
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
}
