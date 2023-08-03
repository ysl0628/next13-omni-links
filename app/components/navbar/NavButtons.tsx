import Link from 'next/link'
import React from 'react'

const NavButtons = () => {
  return (
    <div className="flex justify-center items-center gap-3">
      <Link className="text-[#556987]" href="contact-us">
        聯絡我們
      </Link>
    </div>
  )
}

export default NavButtons
