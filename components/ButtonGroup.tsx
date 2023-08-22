'use client'

import { RadioGroup } from '@headlessui/react'

import { FormikProps, getIn } from 'formik'

interface Values {
  [x: string]: any
}
interface Props {
  list: Record<string, string>[]
  title: string
  name: string
  formik: FormikProps<Values>
}

export default function Example({ title, list, formik, name }: Props) {
  const value = getIn(formik.values, name)

  return (
    <div className="w-full ">
      <RadioGroup
        className="flex flex-col gap-2"
        value={value}
        onChange={(value) =>
          formik.handleChange({
            target: {
              name,
              value
            }
          })
        }
      >
        <RadioGroup.Label className="text-md text-zinc-400">
          {title}
        </RadioGroup.Label>
        <div className="flex shadow-lg divide-x-2 rounded-full ">
          {list.map((item, index) => (
            <RadioGroup.Option
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
