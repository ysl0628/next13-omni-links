import React from 'react'

interface DividerProps {
  vertical?: boolean
}

const Divider = ({ vertical }: DividerProps) => {
  return vertical ? (
    <div className="h-full min-h-[5rem] flex-grow w-0.5 self-stretch bg-neutral-300 opacity-100 dark:opacity-50" />
  ) : (
    <div className="h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
  )
}

export default Divider
