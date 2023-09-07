'use client'

import { RadioGroup } from '@headlessui/react'

interface Values {
  [x: string]: any
}
interface Props {
  id: string
  value: string
  list: Record<string, string>[]
  title: string
  onChange: (value: string) => void
}

export default function Example({ id, value, title, list, onChange }: Props) {
  return (
    <div className="w-full ">
      <RadioGroup
        id={`radio-group-${id}`}
        className="flex flex-col gap-2"
        value={value}
        onChange={onChange}
      >
        <RadioGroup.Label id="radio-title" className="text-md text-zinc-400">
          {title}
        </RadioGroup.Label>
        <div className="flex shadow-lg divide-x-2 rounded-full ">
          {list.map((item, index) => (
            <RadioGroup.Option
              id="radio-option"
              key={item.name}
              value={item.id}
              className={({ active, checked }) =>
                `${
                  active
                    ? 'z-10 ring-2 ring-transparent ring-opacity-60 ring-offset-2 ring-offset-secondary-300'
                    : ''
                }
                  ${
                    checked
                      ? 'bg-secondary-500 bg-opacity-75 text-white hover:bg-opacity-75'
                      : 'bg-white hover:bg-opacity-25'
                  }
                ${index === 0 ? 'rounded-l-full' : ''}
                ${index === list.length - 1 ? 'rounded-r-full' : ''}
                flex w-full justify-center cursor-pointer px-5 py-4 
                hover:bg-secondary-500
                focus:outline-none`
              }
            >
              {({ active, checked }) => (
                <>
                  <div className="flex items-center justify-between">
                    <div className="text-md">
                      <RadioGroup.Label
                        id={`radio-option-${item.id}`}
                        as="p"
                        className={`font-medium  ${
                          checked ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {item.name}
                      </RadioGroup.Label>
                    </div>
                  </div>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}
