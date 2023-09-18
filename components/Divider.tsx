import React from 'react'

interface DividerProps {
  vertical?: boolean
  color?: string
}

const Divider = ({ vertical, color }: DividerProps) => {
  const bgColor = color ? `bg-${color}` : 'bg-neutral-100'
  return vertical ? (
    <div
      className={`h-full min-h-[5rem] flex-grow w-0.5 self-stretch ${bgColor} opacity-100 dark:opacity-50`}
    />
  ) : (
    <div
      className={`h-0.5 border-t-0 ${bgColor} opacity-100 dark:opacity-50`}
    />
  )
}

export default Divider
