'use client'

import { Toaster } from 'react-hot-toast'

// Toaster 是 server component，所以要用 provider 包起來

const ToasterProvider = () => {
  return <Toaster />
}

export default ToasterProvider
