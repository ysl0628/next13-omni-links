import React from 'react'

const Page = ({ params }: { params: { id: string } }) => {
  return <div className="pt-[4.5rem]">Home {params.id}</div>
}

export default Page
