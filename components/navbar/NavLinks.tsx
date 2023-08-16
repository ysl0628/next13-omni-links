import { User } from '@prisma/client'
import Link from 'next/link'

interface NavLinksProps {
  currentUser?: User | null
}

const NavLinks: React.FC<NavLinksProps> = ({ currentUser }) => {
  return (
    <div className="flex justify-center items-center gap-16 py-2">
      {currentUser && (
        <>
          <Link className="text-grey-500" href="/admin">
            基本設定
          </Link>
          <Link className="text-grey-500" href="/admin/settings">
            連結設定
          </Link>
        </>
      )}
      <Link className="text-grey-500" href="/contact-us">
        聯絡我們
      </Link>
    </div>
  )
}

export default NavLinks
