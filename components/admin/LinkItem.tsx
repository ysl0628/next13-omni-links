import { linkList } from '@/constants/linkMapping'
import { Listbox, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'

import { LuChevronsUpDown } from 'react-icons/lu'
import LabelInput from '../input/LabelInput'

const LinkItem = () => {
  const [selected, setSelected] = useState(linkList[0].label)

  return (
    <div className="flex justify-between gap-3 border-2 p-4 rounded-md">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center gap-2">
          <div className="w-12 justify-self-stretch">類型</div>
          <div className="">
            <Listbox value={selected} onChange={setSelected}>
              <div className="mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate">{selected}</span>
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
                  <Listbox.Options className="absolute mt-1 max-h-60 max-w-[37rem] w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
                    {linkList.map((item, index) => (
                      <Listbox.Option
                        key={index}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? 'bg-amber-100 text-amber-900'
                              : 'text-gray-900'
                          }`
                        }
                        value={item.id}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
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
          </div>
        </div>
        <div className="flex items-center ">
          <div className="w-12 mr-3 flex-grow">連結</div>
          <div className=" flex-auto w-full">
            <LabelInput id="link" small placeholder="請輸入連結網址" />
          </div>
        </div>
      </div>
      <div>刪除紐</div>
    </div>
  )
}

export default LinkItem
