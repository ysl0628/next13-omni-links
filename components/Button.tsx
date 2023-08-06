'use client'

import React from 'react'
import { IconType } from 'react-icons'

interface ButtonProps {
  label?: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  fullWidth?: boolean
  small?: boolean
  icon?: IconType
  className?: string
  variant?: 'text' | 'outline' | 'default'
  size?: 'small' | 'medium' | 'large'
  color?:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'success'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark'
    | 'link'
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  small,
  fullWidth,
  className,
  icon: Icon,
  color = 'primary',
  size = 'medium',
  variant = 'default'
}) => {
  const buttonType = {
    text: 'text-grey-500 border-none',
    outline: 'bg-white border-black text-black',
    default: ''
  }
  const buttonSize = {
    small: 'px-2 py-1 text-sm font-light border-[1px]',
    medium: 'px-4 py-1.5 text-md font-semibold border-2',
    large: 'px-6 py-2 text-lg font-semibold border-2'
  }

  const colors = {
    primary: 'bg-primary-500 border-primary-500 text-white',
    secondary: 'bg-secondary-500 border-secondary-500 text-white',
    danger: 'bg-danger-500 border-danger-500 text-white',
    success: 'bg-success-500 border-success-500 text-white',
    warning: 'bg-warning-500 border-warning-500 text-white',
    info: 'bg-info-500 border-info-500 text-white',
    light: 'bg-light-500 border-light-500 text-black',
    dark: 'bg-grey-800 border-grey-800 text-white',
    link: 'bg-transparent border-transparent text-grey-500'
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
        ${buttonSize[size]}
        ${buttonType[variant]}
        ${variant === 'default' ? colors[color] : ''}
        ${className ? className : ''}
        `}
    >
      {Icon && label && (
        <Icon size={small ? 16 : 24} className="absolute left-4 top-3" />
      )}
      {Icon && !label && (
        <div className="flex justify-center items-center">
          <Icon size={small ? 16 : 24} />
        </div>
      )}
      {label}
    </button>
  )
}

export default Button
