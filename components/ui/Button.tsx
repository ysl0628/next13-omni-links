'use client'

import React, { ReactNode } from 'react'
import { IconType } from 'react-icons'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string | ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  fullWidth?: boolean
  small?: boolean
  icon?: IconType
  rounded?: 'small' | 'medium' | 'large' | 'full'
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
  rounded = 'large',
  color = 'primary',
  size = 'medium',
  variant = 'default',
  ...props
}) => {
  const buttonType = {
    text: 'text-grey-500 border-none',
    outline: 'bg-white',
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

  const colorsOutline = {
    primary:
      'hover:bg-primary-200 hover:text-primary-700 border-primary-500 text-primary-500',
    secondary:
      'hover:bg-secondary-200 hover:text-secondary-700 border-secondary-500 text-secondary-500',
    danger:
      'hover:bg-danger-200 hover:text-danger-700 border-danger-500 text-danger-500',
    success:
      'hover:bg-success-200 hover:text-success-700 border-success-500 text-success-500',
    warning:
      'hover:bg-warning-200 hover:text-warning-700 border-warning-500 text-warning-500',
    info: 'hover:bg-info-200 hover:text-info-700 border-info-500 text-info-500',
    light:
      'hover:bg-light-200 hover:text-light-700 border-light-500 text-light-500',
    dark: 'hover:bg-grey-700 hover:text-grey-200 border-grey-800 text-grey-800',
    link: 'hover:bg-grey-200 hover:text-grey-700 border-transparent text-grey-500'
  }

  const buttonRounded = {
    small: 'rounded-sm',
    medium: 'rounded-md',
    large: 'rounded-lg',
    full: 'rounded-full'
  }

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        hover:opacity-80
        transition
        ${fullWidth ? 'w-full' : 'w-auto'}
        ${buttonSize[size]}
        ${buttonType[variant]}
        ${variant === 'default' ? colors[color] : ''}
        ${variant === 'outline' ? colorsOutline[color] : ''}
        ${buttonRounded[rounded]}
        ${className ? className : ''}
        `}
      {...props}
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
