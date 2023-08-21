import { socialType } from '@/constants/linkMapping'
import { IconType } from 'react-icons'

export interface IconTypeProps {
  label?: string | null
  icon: IconType | null
  style?: string
}

export interface LinkType {
  type: keyof typeof socialType
  title: string
  url: string
  order?: number
}

export interface AdminType {
  customImage?: string | null
  title?: string | null
  description?: string | null
  themeColor?: 'basic' | 'blue-green' | 'red-orange' | null
}

export interface GetAdminType {
  customImage?: string | null
  title?: string | null
  description?: string | null
  themeColor?: string | null
}
