'use client'

import { PuffLoader } from 'react-spinners'

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[90vh]">
      <PuffLoader size={100} color="#22C55E" />
    </div>
  )
}

export default Loader
