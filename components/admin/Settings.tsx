'use client'

import { Fragment, useState } from 'react'
import { Transition } from '@headlessui/react'

import Button from '../Button'
import Divider from '../Divider'
import EditLinkItem from './EditLinkItem'

import { MdDragIndicator } from 'react-icons/md'
import DisplayLinkItem from './DisplayLinkItem'

const themeList = [
  {
    name: '基礎色',
    id: 'basic'
  },
  {
    name: '藍綠色',
    id: 'blue-green'
  },
  {
    name: '紅橘色',
    id: 'red-orange'
  }
]

const dummyItems = [
  {
    id: '11gg',
    title: 'Facebook',
    url: 'https://www.facebook.com',
    type: 'facebook'
  }
]

const Settings = () => {
  const [linkType, setLinkType] = useState<'' | 'custom' | 'social'>('')
  const [isEditing, setIsEditing] = useState<boolean>(false)

  return (
    <div className="w-full min-w-[25rem] flex md:min-w-[40rem] flex-col py-4 gap-3 bg-white rounded shadow-md md:mx-16 my-12">
      <div className="text-3xl font-semibold px-6 p-2 text-grey-600 divide-y">
        連結設定
      </div>
      <Divider />
      <div className="px-6 py-4 flex flex-col gap-4">
        <Transition
          appear={true}
          show={linkType === ''}
          enter="enter duration-500"
          enterFrom="enterFrom"
          enterTo="enterTo"
          unmount={false}
          leave="leave"
          leaveFrom="h-full"
          leaveTo="h-0"
          className="flex flex-col w-full md:flex-row gap-4"
        >
          <Button
            onClick={() => setLinkType('social')}
            label="新增社群連結"
            rounded="full"
            size="large"
            className="w-full"
          />
          <Button
            onClick={() => setLinkType('custom')}
            label="新增自訂連結"
            color="secondary"
            rounded="full"
            size="large"
            className="w-full"
          />
        </Transition>
        <Transition
          appear={true}
          show={linkType !== ''}
          enter="enter"
          enterFrom="enterFrom"
          enterTo="enterTo"
          unmount={false}
          leave="leave"
          leaveFrom="leaveFrom"
          leaveTo="leaveTo"
          className="flex w-full"
        >
          <EditLinkItem
            isCustom={linkType === 'custom'}
            onClose={() => setLinkType('')}
          />
        </Transition>
        <div className="flex items-center gap-2">
          <MdDragIndicator size={24} className="text-grey-400" />

          {dummyItems.map((item) => {
            return isEditing ? (
              <EditLinkItem
                key={item.id}
                item={item}
                isCustom={item.type === 'custom'}
                onClose={() => setIsEditing(false)}
              />
            ) : (
              <DisplayLinkItem
                key={item.id}
                item={item}
                isCustom={item.type === 'custom'}
                onEditMode={() => setIsEditing(true)}
              />
            )
          })}
        </div>
      </div>
      <div className="px-6 py-4 flex justify-end">
        <Button
          label="預覽"
          size="large"
          className="w-full md:w-1/4"
          onClick={() => {}}
        />
      </div>
    </div>
  )
}

export default Settings
