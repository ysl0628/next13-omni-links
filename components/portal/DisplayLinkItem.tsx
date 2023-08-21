'use client'

import { FiTrash } from 'react-icons/fi'
import { MdEdit } from 'react-icons/md'

interface DisplayLinkItemProps {
  item: {
    id: string
    title: string
    url: string
    type: string
  }
  isWebsite?: boolean
  onClose?: () => void
  onEditMode: () => void
}

const DisplayLinkItem = ({
  item,
  isWebsite,
  onClose,
  onEditMode
}: DisplayLinkItemProps) => {
  return (
    <div className="flex w-full justify-between items-center gap-8 shadow-lg p-4 rounded-xl">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center gap-2">
          <div className="w-12">{isWebsite ? '名稱' : '類型'}</div>

          <div className="py-1.5 text-grey-500">{item.title}</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-12 ">連結</div>
          <div className="py-1.5 text-grey-500 text-ellipsis">{item.url}</div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="bg-grey-400 rounded-full p-1.5 hover:bg-slate-800 cursor-pointer">
          <FiTrash className="h-5 w-5 text-white" />
        </div>
        <div
          className={
            'bg-secondary-500 rounded-full p-1.5 hover:opacity-80 cursor-pointer'
          }
        >
          <MdEdit className="h-5 w-5 text-white" onClick={onEditMode} />
        </div>
      </div>
    </div>
  )
}

export default DisplayLinkItem
