import React from 'react'

import Container from '../Container'
import Divider from '../Divider'
import Preview from './Preview'

const AdminContainer = ({
  mainComponent: MainComponent
}: {
  mainComponent: React.ElementType
}) => {
  if (!MainComponent) return null
  return (
    <Container>
      <div className="flex gap-3 min-h-full max-w-screen-xl mx-auto">
        <MainComponent />
        <div className="hidden md:block">
          <Divider vertical />
        </div>
        <Preview />
      </div>
    </Container>
  )
}

export default AdminContainer
