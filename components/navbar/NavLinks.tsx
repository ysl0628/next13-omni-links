import Link from 'next/link'

const NavLinks = () => {
  return (
    <div className="sm:flex justify-center items-center gap-16 py-2 hidden">
      <>
        <Link className="text-grey-500" href="/portal/basic">
          基本設定
        </Link>
        <Link className="text-grey-500" href="/portal/links">
          連結設定
        </Link>
      </>
    </div>
  )
}

export default NavLinks
