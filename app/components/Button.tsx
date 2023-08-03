'use client'

import React from 'react'
import { IconType } from 'react-icons'

interface ButtonProps {
  label: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  text?: boolean
  outline?: boolean
  fullWidth?: boolean
  small?: boolean
  icon?: IconType
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  text,
  outline,
  small,
  fullWidth,
  icon: Icon
}) => {
  const buttonType = {
    text: 'text-[#556987] border-none',
    outline: 'bg-white border-black text-black',
    default: 'bg-[#22C55E] border-[#22C55E] text-white'
  }

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        ${fullWidth ? 'w-full' : 'w-auto'}
        ${
          small
            ? 'px-2 py-1 text-sm font-light border-[1px]'
            : 'px-4 py-2 text-md font-semibold border-2'
        }
        ${
          text
            ? buttonType.text
            : outline
            ? buttonType.outline
            : buttonType.default
        }
        `}
    >
      {Icon && (
        <Icon size={small ? 16 : 24} className="absolute left-4 top-3" />
      )}
      {label}
    </button>
  )
}

export default Button
