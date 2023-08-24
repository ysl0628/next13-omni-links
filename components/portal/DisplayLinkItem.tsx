'use client'
import axios from 'axios'
import useSetting from '@/hooks/useSetting'

import { FiTrash } from 'react-icons/fi'
import { MdEdit } from 'react-icons/md'
import toast from 'react-hot-toast'
import { LinkType } from '@prisma/client'

interface DisplayLinkItemProps {
  item: {
    id: string
    title: string
    url: string
    type: LinkType
  }
  isWebsite?: boolean
  onEditMode: () => void
}

const DisplayLinkItem = ({
  item,
  isWebsite,
  onEditMode
}: DisplayLinkItemProps) => {
  const { user } = useSetting((state) => state)

  const handleDeleteLink = async () => {
    try {
      await axios.delete(`/api/user/${user?.id}/links/${item?.id}`)
      toast.success('刪除成功')
    } catch (error) {
      toast.error('刪除失敗')
    }
  }
  return (
    <div className="flex w-full justify-between items-center gap-8 shadow-lg p-4 rounded-xl">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center gap-2">
          <div className="w-12">{isWebsite ? '名稱' : '類型'}</div>

          <div className="py-1.5 text-grey-500">
            {isWebsite ? item.title : item.type.label}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-12 ">連結</div>
          <div className="py-1.5 text-grey-500 text-clip whitespace-nowrap ">
            {item.url}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div
          className="bg-grey-400 rounded-full p-1.5 hover:bg-slate-800 cursor-pointer"
          onClick={handleDeleteLink}
        >
          <FiTrash className="h-5 w-5 text-white" />
        </div>
        <div
          className={
            'bg-secondary-500 rounded-full p-1.5 hover:opacity-80 cursor-pointer'
          }
          onClick={onEditMode}
        >
          <MdEdit className="h-5 w-5 text-white" />
        </div>
      </div>
    </div>
  )
}

export default DisplayLinkItem
