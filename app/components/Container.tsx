'use client'
// 由於此檔案會被引入 client component 中，所以需要加上 'use client'
// 因為 client component 不可以引入 server component

import React from 'react'

interface Props {
  children: React.ReactNode
}

const Container: React.FC<Props> = ({ children }) => {
  return (
    <div
      className="
    max-w-[2520px] 
    mx-auto 
    xl:px-20 
    md:px-10 
    sm:px-2 
    px-4"
    >
      {children}
    </div>
  )
}

export default Container
