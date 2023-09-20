'use client'

import axios from 'axios'
import toast from 'react-hot-toast'
import { useCallback, useState } from 'react'
import { Transition } from '@headlessui/react'
import { DropResult } from '@hello-pangea/dnd'

import Button from '../../../Button'
import Divider from '../../../Divider'
import EditLinkItem from './EditLinkItem'
import DisplayLinkItem from './DisplayLinkItem'
import DragDropLinkList from './DragDropLinkList'

import useSetup from '@/hooks/useSetup'
import { notifyError } from '@/utils/notify'
import { LinkSetupType } from '@/types'

const LinksSetup = () => {
  const user = useSetup((state) => state.user)
  const links = useSetup((state) => state.links)
  const { update, revertLinks } = useSetup((state) => state)
  const [originalOrder] = useState<LinkSetupType[] | null>(links)
  const [linkType, setLinkType] = useState<'' | 'website' | 'social'>('')
  const [isEditingId, setIsEditingId] = useState<string>('')
  const [isDragging, setIsDragging] = useState(false)

  const reorder = (
    list: LinkSetupType[] | null,
    startIndex: number,
    endIndex: number
  ) => {
    const result = Array.from(list || [])
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) {
        return
      }

      const items = reorder(
        links,
        result.source.index,
        result.destination.index
      )

      update({ links: items })
    },
    [links, update]
  )

  const handleToggleDraggable = () => {
    setIsDragging((prev) => !prev)
  }

  const handleUpdateLinks = async () => {
    try {
      const updateLinks = links?.map((item, index) => {
        return {
          ...item,
          order: links.length - index
        }
      })
      const { data: res } = await axios.patch(`/api/user/${user?.id}/links`, {
        links: updateLinks
      })

      update({ links: res.data })
      toast.success('更新成功')
      setIsDragging(false)
    } catch (error: any) {
      notifyError(error, '更新失敗')
      console.log(error)
    }
  }

  const handleCancelUpdate = () => {
    setIsDragging(false)
    revertLinks(originalOrder)
  }

  const LinkList = () => {
    return links?.map((item, index) => {
      return isEditingId === item?.id ? (
        <EditLinkItem
          key={item?.id}
          item={item}
          index={index}
          lastItemOrder={links.length - 1}
          isWebsite={item?.type?.id === 'website'}
          onClose={() => setIsEditingId('')}
        />
      ) : (
        <DisplayLinkItem
          key={item?.id}
          item={item}
          isWebsite={item?.type?.id === 'website'}
          onEditMode={() => setIsEditingId(item?.id)}
        />
      )
    })
  }

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
          enter="transition ease duration-500 transform"
          enterFrom="hidden -translate-y-12"
          enterTo="block translate-y-0"
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
          enter="transition ease duration-300 transform"
          enterFrom="opacity-0 -translate-y-20"
          enterTo="opacity-100 translate-y-0"
          className="flex w-full"
        >
          <EditLinkItem
            isWebsite={linkType === 'website'}
            onClose={() => setLinkType('')}
            lastItemOrder={links ? links.length - 1 : -1}
          />
        </Transition>
        {isDragging ? (
          <DragDropLinkList
            links={links}
            isDragging={isDragging}
            onDragEnd={onDragEnd}
            setIsEditingId={setIsEditingId}
          />
        ) : (
          <LinkList />
        )}
        {isDragging ? (
          <div className="flex gap-4">
            <Button
              label="取消"
              rounded="full"
              color="dark"
              variant="outline"
              className="w-full"
              onClick={handleCancelUpdate}
            />
            <Button
              label="更新"
              rounded="full"
              color="info"
              className="w-full"
              onClick={handleUpdateLinks}
            />
          </div>
        ) : (
          <Button
            label="編輯順序"
            color="info"
            rounded="full"
            onClick={handleToggleDraggable}
          />
        )}
      </div>
    </>
  )
}

export default LinksSetup
