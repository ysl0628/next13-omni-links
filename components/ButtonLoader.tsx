'use client'

import ClipLoader from 'react-spinners/ClipLoader'

const ButtonLoader = () => {
  return (
    <div className="flex justify-center items-center">
      <ClipLoader size={20} color="rgb(245 200 80)" />
    </div>
  )
}

export default ButtonLoader
