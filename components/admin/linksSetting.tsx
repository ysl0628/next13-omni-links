'use client'

import { useState } from 'react'
import { Transition } from '@headlessui/react'

import Button from '../Button'
import Divider from '../Divider'
import EditLinkItem from './EditLinkItem'

import { MdDragIndicator } from 'react-icons/md'
import DisplayLinkItem from './DisplayLinkItem'

const dummyItems = [
  {
    id: '11gg',
    title: 'Facebook',
    url: 'https://www.facebook.com',
    type: 'facebook'
  }
]

const LinksSetting = () => {
  const [linkType, setLinkType] = useState<'' | 'website' | 'social'>('')
  const [isEditing, setIsEditing] = useState<boolean>(false)

  return (
    <>
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
            onClick={() => setLinkType('website')}
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
            isWebsite={linkType === 'website'}
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
                isWebsite={item.type === 'custom'}
                onClose={() => setIsEditing(false)}
              />
            ) : (
              <DisplayLinkItem
                key={item.id}
                item={item}
                isWebsite={item.type === 'custom'}
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
    </>
  )
}

export default LinksSetting
