'use client'

import axios from 'axios'
import dynamic from 'next/dynamic'
import toast from 'react-hot-toast'
import Skeleton from 'react-loading-skeleton'
import { PropsWithChildren, Suspense, lazy, useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'

import Button from '../../../ui/Button'
import Divider from '../../../ui/Divider'
import DndLinkList from './DndLinkList'
import ButtonLoader from '@/components/ButtonLoader'
import DisplayLinkItem from './DisplayLinkItem'

import useSetup from '@/hooks/useSetup'
import { notifyError } from '@/utils/notify'
import { LinkSetupType } from '@/types'

const AddButtons = lazy(() => import('./AddButtons'))

const EditLinkItem = dynamic(() => import('./EditLinkItem'), {
  loading: () => (
    <Skeleton width="100%" height={112} wrapper={SuspenseWrapper} />
  )
})

const LinksSetup = () => {
  const user = useSetup((state) => state.user)
  const links = useSetup((state) => state.links)
  const { update, revertLinks } = useSetup((state) => state)
  const [originalOrder, setOriginalOrder] = useState<LinkSetupType[] | null>(
    links
  )
  const [linkType, setLinkType] = useState<'' | 'website' | 'social'>('')
  const [isEditingId, setIsEditingId] = useState<string>('')
  const [isDragMode, setIsDragMode] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleToggleDraggable = () => {
    setIsDragMode((prev) => !prev)
  }

  const handleUpdateLinks = async () => {
    setIsUpdating(true)
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
      setIsDragMode(false)
    } catch (error: any) {
      notifyError(error, '更新失敗')
      console.log(error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleCancelUpdate = () => {
    setIsDragMode(false)
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

  const lastItemOrder = links?.[0]?.order || 0

  useEffect(() => {
    if (links && !originalOrder) {
      setOriginalOrder(links)
    }
  }, [links, originalOrder])

  return (
    <>
      <div className="text-2xl sm:text-3xl font-semibold flex md:flex-row flex-wrap items-center px-5 2xs:px-6 p-2 gap-3 text-grey-600">
        <p className="font-inter">連結設定</p>
        <p className="text-sm font-light text-grey-400 font-oswald">
          最多可新增 8 筆連結
        </p>
      </div>
      <Divider />
      <div className="px-5 2xs:px-6 pb-4 flex flex-col gap-4">
        <Transition
          appear={true}
          show={linkType === ''}
          enter="transition ease duration-500 transform"
          enterFrom="opacity-0 -translate-y-12"
          enterTo="opacity-100 translate-y-0"
          className="flex flex-col items-center w-full sm:flex-row gap-4 h-28"
        >
          <Suspense
            fallback={<Skeleton width={288} height={42} count={2} inline />}
          >
            <AddButtons setLinkType={setLinkType} />
          </Suspense>
        </Transition>

        {linkType !== '' && (
          <EditLinkItem
            isWebsite={linkType === 'website'}
            onClose={() => setLinkType('')}
            lastItemOrder={lastItemOrder}
          />
        )}

        {isDragMode ? (
          <DndLinkList links={links} isDragMode={isDragMode} />
        ) : (
          <LinkList />
        )}

        {isDragMode && (
          <div className="flex gap-4">
            <Button
              label="取消"
              rounded="full"
              color="dark"
              variant="outline"
              className="w-full"
              onClick={handleCancelUpdate}
              disabled={isUpdating}
            />
            <Button
              label={isUpdating ? <ButtonLoader /> : '更新'}
              rounded="full"
              color="info"
              className="w-full"
              onClick={handleUpdateLinks}
              disabled={isUpdating}
            />
          </div>
        )}

        {!isDragMode && links && links.length >= 2 && (
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

const SuspenseWrapper = ({ children }: PropsWithChildren<unknown>) => {
  return <span className=" md:w-[592px] w-[345px]">{children}</span>
}

export default LinksSetup
