import { socialType } from '@/constants/linkMapping'
import { IconType } from 'react-icons'

export interface IconTypeProps {
  label?: string | null
  icon: IconType | null
  style?: string
}

export interface LinkType {
  id: string
  type: keyof typeof socialType
  title: string
  url: string
  order?: number
}

export type ThemeColorType = 'basic' | 'blue-green' | 'red-orange' | null

export interface AdminType {
  customImage?: string | null
  title?: string | null
  description?: string | null
  themeColor?: ThemeColorType
}

export interface GetAdminType {
  customImage?: string | null
  title?: string | null
  description?: string | null
  themeColor?: string | null
}
