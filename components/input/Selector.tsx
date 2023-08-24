import React, { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'

import { LuChevronsUpDown } from 'react-icons/lu'
import { FormikProps, getIn } from 'formik'

interface Values {
  [x: string]: any
}
interface LinkItemValue {
  id: string
  label: string
}
interface LinkItemProps<T extends Values> {
  // selected: string
  formik: FormikProps<T>
  name: string
  // onChange: (value: string) => void
  options: LinkItemValue[]
}

const defaultValue = {
  id: 'default',
  label: '請選擇'
}

const Selector: React.FC<LinkItemProps<Values>> = ({
  formik,
  name,
  // selected,
  // onChange,
  options
}) => {
  const value = getIn(formik.values, name)
  const error = getIn(formik.errors, name)

  const handleChange = (value: LinkItemValue) => {
    formik.setFieldValue(name, value)
  }

  return (
    <>
      <Listbox value={value || defaultValue} onChange={handleChange}>
        <div className=" w-full">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left hover:shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{value.label}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <LuChevronsUpDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 max-w-[10rem] w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
              {options.map((item, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          value ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {item.label}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </>
  )
}

export default Selector
