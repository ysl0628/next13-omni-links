import React, { useState } from 'react'
import { useFormik } from 'formik'

import Selector from '../input/Selector'
import LabelInput from '../input/LabelInput'

import useSetting from '@/hooks/useSetting'
import { linkList } from '@/constants/linkMapping'

import { MdClose, MdCheck } from 'react-icons/md'
import axios from 'axios'
import { toast } from 'react-hot-toast'
interface EditLinkItemProps {
  item?: {
    id: string
    title: string
    url: string
    type: string
  }
  index?: number
  lastItemOrder: number
  isWebsite?: boolean
  onClose?: () => void
}

interface FormValues {
  id?: string
  title?: string
  url?: string
  type?: string
  order?: number
}

const EditLinkItem = ({
  item,
  index,
  isWebsite,
  lastItemOrder,
  onClose
}: EditLinkItemProps) => {
  const { user } = useSetting((state) => state)
  const [selected, setSelected] = useState(linkList[0].label)

  const formik = useFormik<FormValues>({
    initialValues: {
      id: item?.id || '',
      title: item?.title || '',
      url: item?.url || '',
      type: item?.type || '',
      order: item ? index : lastItemOrder + 1
    },
    onSubmit: (values) => {
      const result = {
        ...values,
        type: isWebsite ? 'website' : selected,
        title: values.title || selected
      }

      if (item) {
        handleUpdateLink(result)
      }
      handleAddLink(result)
    }
  })

  const handleAddLink = async (values: FormValues) => {
    try {
      await axios.post(`/api/user/${user?.id}/links`, values)
      toast.success('新增成功')
    } catch (error) {
      toast.error('新增失敗')
    }
  }

  const handleUpdateLink = async (values: FormValues) => {
    try {
      await axios.put(`/api/user/${user?.id}/links/${values.id}`, values)
      toast.success('更新成功')
    } catch (error) {
      toast.error('更新失敗')
    }
  }

  return (
    <div className="flex w-full justify-between items-center gap-8 shadow-lg p-4 rounded-xl">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center gap-2">
          <div className="w-12">{isWebsite ? '名稱' : '類型'}</div>

          {isWebsite ? (
            <div className="flex-auto">
              <LabelInput
                formik={formik}
                name="title"
                small
                placeholder="請輸入連結名稱"
              />
            </div>
          ) : (
            <div className="border-2 rounded-lg w-1/3">
              <Selector
                formik={formik}
                name="type"
                options={linkList}
                selected={selected}
                onChange={setSelected}
              />
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="w-12 ">連結</div>
          <div className="flex-auto ">
            <LabelInput
              formik={formik}
              name="url"
              small
              placeholder="請輸入連結網址"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="bg-grey-400 rounded-full p-1.5 hover:bg-slate-800 cursor-pointer">
          <MdClose className="h-5 w-5 text-white" onClick={onClose} />
        </div>
        <div
          className={
            'bg-secondary-500 rounded-full p-1.5 hover:opacity-80 cursor-pointer'
          }
        >
          <MdCheck className="h-5 w-5 text-white" onClick={onClose} />
        </div>
      </div>
    </div>
  )
}

export default EditLinkItem
