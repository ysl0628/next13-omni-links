'use client'

import React from 'react'
import Container from '../Container'
import AdminSettings from './AdminSettings'
import Divider from '../Divider'
import Preview from '../preview/Preview'

const AdminClient = () => {
  return (
    <Container>
      <div className="flex gap-3 min-h-full max-w-screen-xl mx-auto">
        <AdminSettings />
        <div className="hidden md:block">
          <Divider vertical />
        </div>
        <Preview />
      </div>
    </Container>
  )
}

export default AdminClient
