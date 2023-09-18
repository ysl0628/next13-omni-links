'use client'

import axios from 'axios'
import toast from 'react-hot-toast'
import { useCallback, useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable
} from '@hello-pangea/dnd'

import Button from '../../../Button'
import Divider from '../../../Divider'
import EditLinkItem from './EditLinkItem'
import DisplayLinkItem from './DisplayLinkItem'

import useSetup from '@/hooks/useSetup'
import { LinkSetupType } from '@/types'

import { MdDragIndicator } from 'react-icons/md'

const LinksSetup = () => {
  const user = useSetup((state) => state.user)
  const links = useSetup((state) => state.links)
  const { update, revertLinks } = useSetup((state) => state)
  const [enabled, setEnabled] = useState(false)
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

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true))

    return () => {
      cancelAnimationFrame(animation) // 組件卸載時取消請求的動畫幀，以防止內存洩漏
      setEnabled(false)
    }
  }, [])

  if (!enabled) {
    return null
  }

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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error?.response?.data
        toast.error(message)
        return
      }
      toast.error('更新失敗')
      console.log(error)
    }
  }

  const handleCancelUpdate = () => {
    setIsDragging(false)
    revertLinks(originalOrder)
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
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex flex-col items-center gap-2">
            <Droppable droppableId="droppable-1">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  className="flex flex-col items-center gap-2 w-full"
                  {...provided.droppableProps}
                >
                  {links?.map((item, index) => {
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
                      <Draggable
                        key={item?.id}
                        draggableId={item?.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="flex w-full items-center"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                          >
                            {isDragging && (
                              <div
                                {...provided.dragHandleProps}
                                draggable={isDragging}
                              >
                                <MdDragIndicator
                                  size={24}
                                  className="text-grey-400"
                                />
                              </div>
                            )}

                            <DisplayLinkItem
                              item={item}
                              isWebsite={item?.type?.id === 'website'}
                              onEditMode={() => setIsEditingId(item?.id)}
                            />
                          </div>
                        )}
                      </Draggable>
                    )
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
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
