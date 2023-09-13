'use client'

import { memo } from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

import { BiDollar } from 'react-icons/bi'

interface InputProps {
  id: string
  label: string
  errors: FieldErrors
  register: UseFormRegister<FieldValues>
  type?: string
  disabled?: boolean
  formatPrice?: boolean
  required?: boolean
  className?: string

  // register: UseFormRegister<FieldValues>
  // errors: FieldErrors
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  errors,
  register,
  type = 'text',
  disabled,
  formatPrice,
  className,
  required
}) => {
  // 使用 peer 來達到 placeholder 及 label 的轉換效果

  return (
    <div className={`w-full relative ${className ? className : ''}`}>
      {formatPrice && (
        <BiDollar
          size={24}
          className="
            text-neutral-700
            absolute
            top-5
            left-2
          "
        />
      )}
      <input
        id={id}
        {...register(id)}
        title="input"
        disabled={disabled}
        placeholder=" "
        type={type}
        className={`
          peer
          p-2 
          pt-4
          input-base
          ${formatPrice ? 'pl-9' : 'pl-4'}
          ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
          ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
        `}
      />

      <label
        className={`
          absolute 
          text-xs
          text-grey-400
          duration-150 
          transform 
          -translate-y-3 
          top-[1.2rem] 
          z-10 
          origin-[0] 
          ${formatPrice ? 'left-9' : 'left-4'}
          peer-placeholder-shown:scale-110
          peer-placeholder-shown:text-grey-300
          peer-placeholder-shown:-translate-y-0.5 
          peer-focus:scale-90
          peer-focus:text-grey-500
          peer-focus:-translate-y-6
          peer-focus:bg-white
          peer-focus:px-1
          ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
        `}
      >
        {label}
        {required && <span className="text-rose-500">*</span>}
      </label>

      {errors[id] && (
        <span className="absolute text-rose-500 text-sm -bottom-5 left-0">
          {errors[id]?.message as string}
        </span>
      )}
    </div>
  )
}

export default memo(Input)
