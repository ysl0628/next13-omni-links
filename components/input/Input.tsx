'use client'

// import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { BiDollar } from 'react-icons/bi'

interface InputProps {
  id: string
  label: string
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
  type = 'text',
  disabled,
  formatPrice,
  className,
  // register,
  required
  // errors
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
        title="input"
        id={id}
        disabled={disabled}
        // {...register(id, { required })}
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
        `}
      />
      {/* ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}$
      {errors[id] ? 'focus:border-rose-500' : 'focus:border-black'} */}
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
      
        `}
      >
        {/* ${errors[id] ? 'text-rose-500' : 'text-zinc-400'} */}
        {label}
      </label>
    </div>
  )
}

export default Input
