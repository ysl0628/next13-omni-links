'use client'

import { FormikProps, getIn } from 'formik'
// import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { BiDollar } from 'react-icons/bi'

interface Values {
  [x: string]: any
}
interface LabelInputProps<T extends Values> {
  name: string
  formik: FormikProps<T>
  small?: boolean
  label?: string
  placeholder?: string
  type?: string
  max?: number
  textarea?: boolean
  disabled?: boolean
  formatPrice?: boolean
  required?: boolean
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
}

const LabelInput: React.FC<LabelInputProps<Values>> = ({
  label,
  formik,
  name,
  small,
  placeholder,
  type = 'text',
  max = 80,
  textarea,
  disabled,
  formatPrice,
  required,
  onChange
}) => {
  const value = getIn(formik.values, name)
  const error = getIn(formik.errors, name)

  // 使用 peer 來達到 placeholder 及 label 的轉換效果
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
          text-gray-600
          ${formatPrice ? 'left-9' : 'left-4'}
          ${Boolean(error) ? 'text-rose-500' : 'text-zinc-400'}
        `}
        >
          {label}
          {required && <span className="text-rose-500">*</span>}
        </label>
      )}

      {textarea ? (
        <textarea
          name={name}
          disabled={disabled}
          maxLength={textarea ? max : 80}
          value={value}
          onChange={onChange || formik.handleChange}
          placeholder={placeholder || ' '}
          className={`
          w-full
          h-32
          p-4
          font-light 
          bg-white 
          border-2
          rounded-md
          outline-none
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formatPrice ? 'pl-9' : 'pl-4'}
          ${Boolean(error) ? 'border-rose-500' : ''}
          ${Boolean(error) ? 'focus:border-rose-500' : 'focus:border-gray-500'}
          `}
        />
      ) : (
        <input
          name={name}
          disabled={disabled}
          value={value}
          onChange={onChange || formik.handleChange}
          placeholder={placeholder || ' '}
          type={type}
          className={`
          w-full
          ${small ? 'h-8' : 'h-12'}
          p-4
          font-light 
          bg-white 
          border-2
          rounded-md
          outline-none
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formatPrice ? 'pl-9' : 'pl-4'}
          ${Boolean(error) ? 'border-rose-500' : ''}
          ${Boolean(error) ? 'focus:border-rose-500' : 'focus:border-gray-500'}
        `}
        />
      )}
      {error && (
        <span className="absolute text-rose-500 bottom-5">{error}</span>
      )}
    </div>
  )
}

export default LabelInput
