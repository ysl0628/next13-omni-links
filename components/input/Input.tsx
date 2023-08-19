'use client'

import { FormikProps, getIn } from 'formik'
// import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { BiDollar } from 'react-icons/bi'

interface Values {
  [x: string]: any
}
interface InputProps<T extends Values> {
  name: string
  formik: FormikProps<T>
  label: string
  type?: string
  disabled?: boolean
  formatPrice?: boolean
  required?: boolean
  className?: string

  // register: UseFormRegister<FieldValues>
  // errors: FieldErrors
}

const Input: React.FC<InputProps<Values>> = (
  {
    label,
    type = 'text',
    disabled,
    formatPrice,
    className,
    formik,
    name,
    required
  } // errors
) => {
  // 使用 peer 來達到 placeholder 及 label 的轉換效果

  const value = getIn(formik.values, name)
  const error = getIn(formik.errors, name)

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
        title="input"
        name={name}
        disabled={disabled}
        onChange={formik.handleChange}
        value={value || ''}
        placeholder=" "
        type={type}
        className={`
          peer
          w-full
          p-2
          pt-4
          font-light 
          bg-white 
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formatPrice ? 'pl-9' : 'pl-4'}
          ${Boolean(error) ? 'border-rose-500' : 'border-neutral-300'}
          ${Boolean(error) ? 'focus:border-rose-500' : 'focus:border-black'}
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
          ${Boolean(error) ? 'text-rose-500' : 'text-zinc-400'}
        `}
      >
        {label}
        {required && <span className="text-rose-500">*</span>}
      </label>

      {error && (
        <span className="absolute text-rose-500 bottom-5">{error}</span>
      )}
    </div>
  )
}

export default Input
