'use client'

import React, { use } from 'react'
import { usePathname } from 'next/navigation'

import Container from '../Container'
import AdminSettings from './AdminSettings'
import Divider from '../Divider'
import Preview from '../preview/Preview'
import Settings from './Settings'

const AdminClient = () => {
  const path = usePathname()
  const isAdmin = path === '/admin'

  return (
    <Container>
      <div className="flex gap-3 min-h-full max-w-screen-xl mx-auto">
        {isAdmin ? <AdminSettings /> : <Settings />}
        <div className="hidden md:block">
          <Divider vertical />
        </div>
        <Preview />
      </div>
    </Container>
  )
}

export default AdminClient
