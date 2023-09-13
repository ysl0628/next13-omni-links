'use client'

import { Toaster } from 'react-hot-toast'

const ToasterProvider = () => {
  return (
    <Toaster
      containerStyle={{
        position: 'relative',
        top: '5rem',
        marginRight: '1.5rem'
      }}
    />
  )
}

export default ToasterProvider
