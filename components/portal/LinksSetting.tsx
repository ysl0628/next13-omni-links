'use client'

import { Fragment, useState } from 'react'
import { Transition } from '@headlessui/react'

import Button from '../Button'
import Divider from '../Divider'
import EditLinkItem from './EditLinkItem'
import DisplayLinkItem from './DisplayLinkItem'

import useSetting from '@/hooks/useSetting'
import { MdDragIndicator } from 'react-icons/md'

const dummyItems = [
  {
    id: '11gg',
    title: 'Facebook',
    url: 'https://www.facebook.com',
    type: 'facebook'
  }
]

const LinksSetting = () => {
  const links = useSetting((state) => state.links)

  const [linkType, setLinkType] = useState<'' | 'website' | 'social'>('')
  const [isEditingId, setIsEditingId] = useState<string>('')

  return (
    <>
      <div className="text-3xl font-semibold flex items-center px-6 p-2 gap-3 text-grey-600 ">
        <p>連結設定</p>
        <p className="text-sm font-light text-grey-400 ">最多可新增 8 筆連結</p>
      </div>
      <Divider />
      <div className="px-6 pb-4  flex flex-col gap-4">
        <Transition
          appear={true}
          show={linkType === ''}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          // unmount={false}
          // leave="leave"
          // leaveFrom="h-full"
          // leaveTo="h-0"
          className="flex flex-col items-center w-full md:flex-row gap-4 h-28"
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
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          // leave="leave"
          // leaveFrom="opacity-100 translate-y-0"
          // leaveTo="opacity-0 translate-y-1"
          className="flex w-full"
        >
          <EditLinkItem
            isWebsite={linkType === 'website'}
            onClose={() => setLinkType('')}
            lastItemOrder={links ? links.length - 1 : -1}
          />
        </Transition>
        <div className="flex flex-col items-center gap-2">
          {links?.map((item, index) => {
            return isEditingId === item.id ? (
              <EditLinkItem
                key={item.id}
                item={item}
                index={index}
                lastItemOrder={links.length - 1}
                isWebsite={item.type?.id === 'website'}
                onClose={() => setIsEditingId('')}
              />
            ) : (
              <div className="flex w-full items-center" key={item.id}>
                <MdDragIndicator size={24} className="text-grey-400" />
                <DisplayLinkItem
                  item={item}
                  isWebsite={item.type?.id === 'website'}
                  onEditMode={() => setIsEditingId(item.id)}
                />
              </div>
            )
          })}
        </div>
      </div>
      {/* <div className="px-6 py-4 flex justify-end">
        <Button
          label="預覽"
          size="large"
          className="w-full md:w-1/4"
          onClick={() => {}}
        />
      </div> */}
    </>
  )
}

export default LinksSetting
