import React from 'react'
import Link from 'next/link'

import { IconType } from 'react-icons'
import { socialType } from '@/constants/linkMapping'

export interface SocialLinkProps {
  label?: string
  type: string
  url?: string
  customStyle?: string
  icon?: IconType
}

const SocialLink = ({
  label,
  type,
  url,
  icon,
  customStyle
}: SocialLinkProps) => {
  const Icon = icon || socialType[type]?.icon
  const style = customStyle || socialType[type]?.style
  const socialLabel = socialType[type]?.label
  const combinedStyle = `px-4 py-2 flex gap-2 justify-center items-center w-full text-md font-medium border-2 rounded-md ${style} hover:shadow-md hover:opacity-80`

  return (
    <Link className="w-full " href={url || '/'} target="_blank">
      <div className={combinedStyle}>
        {Icon && (
          <div className="flex justify-center items-center">
            <Icon size={24} />
          </div>
        )}
        <div>{label ? label : socialLabel || 'My Link'}</div>
      </div>
    </Link>
  )
}

// export const socialType: Record<string, IconTypeProps | null> = {
//   facebook: {
//     label: 'Facebook',
//     icon: BiLogoFacebookCircle,
//     style: 'bg-blue-600 text-white border-blue-600'
//   },
//   twitter: {
//     label: 'Twitter',
//     icon: BiLogoTwitter,
//     style: 'bg-blue-400 text-white border-blue-400'
//   },
//   instagram: {
//     label: 'Instagram',
//     icon: BiLogoInstagram,
//     style:
//       'bg-gradient-to-tr from-red-600 from-10% via-purple-700 via-60% to-blue-700 to-90% text-white border-blue-500'
//   },
//   linkedin: {
//     label: 'LinkedIn',
//     icon: BiLogoLinkedinSquare,
//     style: 'bg-blue-700 text-white border-blue-700'
//   },
//   github: {
//     label: 'Github',
//     icon: BiLogoGithub,
//     style: 'bg-gray-800 text-white border-gray-800'
//   },
//   youtube: {
//     label: 'Youtube',
//     icon: BiLogoYoutube,
//     style: 'bg-red-600 text-white border-red-600'
//   },
//   spotify: {
//     label: 'Spotify',
//     icon: BiLogoSpotify,
//     style: 'bg-green-600 text-white border-green-600'
//   },
//   discord: {
//     label: 'Discord',
//     icon: BiLogoDiscordAlt,
//     style: 'bg-purple-700 text-white border-purple-700'
//   },
//   tiktok: {
//     label: 'Tiktok',
//     icon: BiLogoTiktok,
//     style: 'bg-black text-white border-black'
//   },
//   email: {
//     label: 'Email',
//     icon: FaEnvelope,
//     style: 'bg-gray-600 text-white border-gray-600'
//   },
//   custom: {
//     label: null,
//     icon: null,
//     style: 'bg-grey-500 text-white border-grey-500'
//   }
// }

export default SocialLink
