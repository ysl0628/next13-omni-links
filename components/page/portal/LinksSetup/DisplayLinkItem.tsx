'use client'
import { useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import toast from 'react-hot-toast'

import useSetup from '@/hooks/useSetup'
import { notifyError } from '@/utils/notify'
import { Link, LinkType } from '@prisma/client'

import { FiTrash } from 'react-icons/fi'
import { MdEdit } from 'react-icons/md'
import ButtonLoader from '@/components/ButtonLoader'

interface DisplayLinkItemProps {
  item: {
    id: string
    title: string
    url: string
    type: LinkType
  }
  isWebsite?: boolean
  isDragging?: boolean
  dragMode?: boolean
  onEditMode?: () => void
}

const DisplayLinkItem = ({
  item,
  isWebsite,
  isDragging,
  dragMode,
  onEditMode
}: DisplayLinkItemProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const user = useSetup((state) => state.user)
  const removeLink = useSetup((state) => state.removeLink)

  const handleDeleteLink = async () => {
    setIsLoading(true)
    try {
      const { data: res } = await axios.delete<AxiosResponse<Link>>(
        `/api/user/${user?.id}/links/${item?.id}`
      )
      removeLink(res.data.id)
      toast.success('刪除成功')
    } catch (error: any) {
      notifyError(error, '刪除失敗')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className={`flex w-full justify-between items-center gap-8 shadow-lg p-4 rounded-xl bg-white max-w-full ${
        isDragging ? 'opacity-30' : ''
      }`}
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center gap-2">
          <div className="w-12">{isWebsite ? '名稱' : '類型'}</div>

          <div className="py-1.5 text-grey-500">
            {isWebsite ? item.title : item.type?.label}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-12 ">連結</div>
          <div
            className="py-1.5 text-grey-500 overflow-hidden text-ellipsis xs:max-w-full 2xs:max-w-[200px] max-w-[160px]  whitespace-nowrap "
            title={item.url}
          >
            {item.url}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {dragMode ? null : (
          <>
            <div
              className="bg-grey-400 rounded-full p-1.5 hover:bg-slate-800 cursor-pointer"
              onClick={handleDeleteLink}
            >
              {isLoading ? (
                <ButtonLoader />
              ) : (
                <FiTrash className="h-5 w-5 text-white" />
              )}
            </div>
            <div
              className={
                'bg-secondary-500 rounded-full p-1.5 hover:opacity-80 cursor-pointer'
              }
              onClick={onEditMode}
            >
              <MdEdit className="h-5 w-5 text-white" />{' '}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default DisplayLinkItem
