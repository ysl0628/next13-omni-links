import React, { FC } from 'react'

interface LabelTextProps {
  label: string
  text: string
  className?: string
}

const LabelText: FC<LabelTextProps> = ({ label, text, className }) => {
  return (
    <div className="flex flex-col gap-1">
      <div
        className="text-md md:text-lg font-semibold
          text-gray-600"
      >
        {label}
      </div>
      <div className="text-md md:text-lg text-gray-500">{text}</div>
    </div>
  )
}

export default LabelText
