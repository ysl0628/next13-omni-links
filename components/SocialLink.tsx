import Link from 'next/link'
import React from 'react'
import { IconType } from 'react-icons'

import {
  BiLogoFacebookCircle,
  BiLogoTwitter,
  BiLogoInstagram,
  BiLogoLinkedinSquare,
  BiLogoGithub,
  BiLogoYoutube,
  BiLogoSpotify,
  BiLogoDiscordAlt,
  BiLogoTiktok
} from 'react-icons/bi'
import { FaEnvelope } from 'react-icons/fa'

interface SocialLinkProps {
  label?: string
  type: string
  url: string
}

interface IconTypeProps {
  label: string
  icon: IconType
  style?: string
}

const iconType: Record<string, IconTypeProps | null> = {
  facebook: {
    label: 'Facebook',
    icon: BiLogoFacebookCircle,
    style: 'bg-blue-500 text-white border-blue-500'
  },
  twitter: {
    label: 'Twitter',
    icon: BiLogoTwitter,
    style: 'bg-blue-500 text-white '
  },
  instagram: {
    label: 'Instagram',
    icon: BiLogoInstagram
  },
  linkedin: {
    label: 'LinkedIn',
    icon: BiLogoLinkedinSquare
  },
  github: {
    label: 'Github',
    icon: BiLogoGithub
  },
  youtube: {
    label: 'Youtube',
    icon: BiLogoYoutube
  },
  spotify: {
    label: 'Spotify',
    icon: BiLogoSpotify
  },
  discord: {
    label: 'Discord',
    icon: BiLogoDiscordAlt
  },
  tiktok: {
    label: 'Tiktok',
    icon: BiLogoTiktok
  },
  email: {
    label: 'Email',
    icon: FaEnvelope
  },
  custom: null
}
const SocialLink = ({ label, type, url }: SocialLinkProps) => {
  const Icon = iconType[type]?.icon
  const style = iconType[type]?.style
  const socialLabel = iconType[type]?.label

  return (
    <Link className="w-full" href={url}>
      <div
        className={`px-4 py-1.5 flex gap-2 justify-center items-center w-full text-sm font-medium border-2 rounded ${style}`}
      >
        {Icon && (
          <div className="flex justify-center items-center">
            <Icon size={24} />
          </div>
        )}
        <div>{socialLabel || label}</div>
      </div>
    </Link>
  )
}

export default SocialLink
