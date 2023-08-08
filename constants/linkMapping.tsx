import { IconTypeProps } from '@/types/common'
import {
  BiLogoDiscordAlt,
  BiLogoFacebookCircle,
  BiLogoGithub,
  BiLogoInstagram,
  BiLogoLinkedinSquare,
  BiLogoSpotify,
  BiLogoTiktok,
  BiLogoTwitter,
  BiLogoYoutube
} from 'react-icons/bi'
import { FaEnvelope } from 'react-icons/fa'

// export const linkMapping = {
//   facebook: (props: SocialLinkProps) => (
//     <SocialLink
//       label="Facebook"
//       icon={BiLogoFacebookCircle}
//       url="https://www.facebook.com/"
//       style="bg-blue-600 text-white border-blue-600"
//       {...props}
//     />
//   )
// }

export const iconType: Record<string, IconTypeProps | null> = {
  facebook: {
    label: 'Facebook',
    icon: BiLogoFacebookCircle,
    style: 'bg-blue-600 text-white border-blue-600'
  },
  twitter: {
    label: 'Twitter',
    icon: BiLogoTwitter,
    style: 'bg-blue-400 text-white border-blue-400'
  },
  instagram: {
    label: 'Instagram',
    icon: BiLogoInstagram,
    style:
      'bg-gradient-to-tr from-red-600 from-10% via-purple-700 via-60% to-blue-700 to-90% text-white border-blue-500'
  },
  linkedin: {
    label: 'LinkedIn',
    icon: BiLogoLinkedinSquare,
    style: 'bg-blue-700 text-white border-blue-700'
  },
  github: {
    label: 'Github',
    icon: BiLogoGithub,
    style: 'bg-gray-800 text-white border-gray-800'
  },
  youtube: {
    label: 'Youtube',
    icon: BiLogoYoutube,
    style: 'bg-red-600 text-white border-red-600'
  },
  spotify: {
    label: 'Spotify',
    icon: BiLogoSpotify,
    style: 'bg-green-600 text-white border-green-600'
  },
  discord: {
    label: 'Discord',
    icon: BiLogoDiscordAlt,
    style: 'bg-purple-700 text-white border-purple-700'
  },
  tiktok: {
    label: 'Tiktok',
    icon: BiLogoTiktok,
    style: 'bg-black text-white border-black'
  },
  email: {
    label: 'Email',
    icon: FaEnvelope,
    style: 'bg-gray-600 text-white border-gray-600'
  },
  custom: {
    label: null,
    icon: null,
    style: 'bg-grey-500 text-white border-grey-500'
  }
}

export const linkList: Record<string, string>[] = [
  {
    id: 'facebook',
    label: 'Facebook'
  },
  {
    id: 'twitter',
    label: 'Twitter'
  },
  {
    id: 'instagram',
    label: 'Instagram'
  },
  {
    id: 'linkedin',
    label: 'LinkedIn'
  },
  {
    id: 'github',
    label: 'Github'
  },
  {
    id: 'youtube',
    label: 'Youtube'
  },
  {
    id: 'spotify',
    label: 'Spotify'
  },
  {
    id: 'discord',
    label: 'Discord'
  },
  {
    id: 'tiktok',
    label: 'Tiktok'
  },
  {
    id: 'email',
    label: 'Email'
  }
]
