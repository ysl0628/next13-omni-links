import React from 'react'
import { getCurrentUser } from '@/actions/getCurrentUser'

import Divider from '../Divider'
import Preview from './Preview'
import Container from '../Container'
import EmptyState from '../EmptyState'

const AdminContainer = async ({
  mainComponent: MainComponent
}: {
  mainComponent: React.ElementType
}) => {
  const currentUser = await getCurrentUser()

  if (!currentUser || !MainComponent) return <EmptyState />

  return (
    <Container>
      <div className="flex gap-3 min-h-full max-w-screen-xl mx-auto">
        <div className="w-full min-w-[30rem] flex md:min-w-[40rem] flex-col py-4 gap-3 bg-white rounded shadow-md md:mx-16 my-12">
          <MainComponent currentUser={currentUser} />
        </div>
        <Preview currentUser={currentUser} />
      </div>
    </Container>
  )
}

export default AdminContainer
