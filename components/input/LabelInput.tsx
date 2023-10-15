'use client'

import { memo } from 'react'
import { BiDollar } from 'react-icons/bi'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface LabelInputProps {
  id: string
  small?: boolean
  label?: string
  placeholder?: string
  type?: string
  max?: number
  textarea?: boolean
  disabled?: boolean
  formatPrice?: boolean
  required?: boolean
  full?: boolean
  errors: FieldErrors
  serverError?: string | null
  register: UseFormRegister<FieldValues>
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
}

const LabelInput: React.FC<LabelInputProps> = ({
  id,
  label,
  small,
  placeholder,
  type = 'text',
  max = 80,
  textarea,
  disabled,
  formatPrice,
  required,
  errors,
  full,
  serverError,
  register
}) => {
  const message = errors[id]?.message as string

  return (
    <div className="w-full flex flex-col gap-2 relative">
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
      {label && (
        <label
          className={`
          text-md
          ${formatPrice ? 'left-9' : 'left-4'}
          ${errors[id] ? 'text-rose-500' : 'text-gray-600'}
        `}
        >
          {label}
          {required && <span className="text-rose-500">*</span>}
        </label>
      )}

      {textarea ? (
        <textarea
          id={id}
          disabled={disabled}
          {...register(id, { required })}
          placeholder={placeholder || ' '}
          maxLength={max}
          className={`
          h-32
          p-4
          input-base
          bg-white
          ${full ? 'w-full' : ''}
          ${formatPrice ? 'pl-9' : 'pl-4'}
          ${errors[id] ? 'border-rose-500' : ''}
          ${errors[id] ? 'focus:border-rose-500' : 'focus:border-gray-500'}
          `}
        />
      ) : (
        <input
          id={id}
          disabled={disabled}
          {...register(id, { required })}
          placeholder={placeholder || ' '}
          type={type}
          className={`
          ${small ? 'h-8' : 'h-12'}
          p-4
          input-base
          bg-white
          ${full ? 'w-full' : ''}
          ${formatPrice ? 'pl-9' : 'pl-4'}
          ${errors[id] || serverError ? 'border-rose-500' : ''}
          ${
            errors[id] || serverError
              ? 'focus:border-rose-500'
              : 'focus:border-gray-500'
          }
        `}
        />
      )}
      {(errors[id] || serverError) && (
        <span className="absolute text-rose-500 -bottom-5 text-sm">
          {message || serverError}
        </span>
      )}
    </div>
  )
}

export default memo(LabelInput)
