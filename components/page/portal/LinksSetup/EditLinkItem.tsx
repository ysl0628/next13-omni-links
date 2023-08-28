import React from 'react'
import axios, { AxiosResponse } from 'axios'
import { toast } from 'react-hot-toast'
import { useFormik } from 'formik'

import Selector from '../../../input/Selector'
import LabelInput from '../../../input/LabelInput'

import { LinkSetupType } from '@/types'
import { Link, LinkType } from '@prisma/client'

import useSetup from '@/hooks/useSetup'
import { linkList } from '@/constants/linkMapping'

import { MdClose, MdCheck } from 'react-icons/md'
interface EditLinkItemProps {
  item?: {
    id: string
    title: string
    url: string
    type: LinkType
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
  type?: LinkType
  order?: number
}

const websiteOption = { id: 'website', label: 'Website' }

const EditLinkItem = ({
  item,
  index,
  isWebsite,
  lastItemOrder,
  onClose
}: EditLinkItemProps) => {
  const user = useSetup((state) => state.user)
  const addLink = useSetup((state) => state.addLink)
  const updateLink = useSetup((state) => state.updateLink)

  const formik = useFormik<FormValues>({
    initialValues: {
      id: item?.id || '',
      title: item?.title || '',
      url: item?.url || '',
      type: item?.type || { id: 'default', label: '請選擇' },
      order: item ? index : lastItemOrder + 1
    },
    onSubmit: (values) => {
      const result = {
        ...values,
        type: isWebsite ? websiteOption : values.type,
        title: values.title || values.type?.label
      }

      if (item) {
        handleUpdateLink(result)
        return
      }
      handleAddLink(result)
    }
  })

  const handleAddLink = async (values: FormValues) => {
    try {
      const result = {
        url: values.url,
        type: values.type,
        title: values.title,
        order: values.order
      }
      const { data: res } = await axios.post<AxiosResponse<Link>>(
        `/api/user/${user?.id}/links`,
        result
      )

      addLink(res.data)

      toast.success('新增成功')
    } catch (error) {
      toast.error('新增失敗')
      console.log(error)
    }
  }

  const handleUpdateLink = async (values: FormValues) => {
    const result = {
      url: values.url || '',
      type: values.type,
      title: values.title || '',
      order: values.order
    }
    try {
      await axios.put(`/api/user/${user?.id}/links/${values.id}`, result)
      toast.success('更新成功')
      updateLink(values?.id, result as LinkSetupType)
    } catch (error) {
      toast.error('更新失敗')
      console.log(error)
    }
  }

  const handleSubmit = () => {
    formik.handleSubmit()
    onClose && onClose()
  }

  return (
    <div className="flex w-full justify-between items-center gap-8 shadow-lg p-4 rounded-xl">
      <form onSubmit={formik.handleSubmit} className="contents">
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
                <Selector formik={formik} name="type" options={linkList} />
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
          <div
            className="bg-grey-400 rounded-full p-1.5 hover:bg-slate-800 cursor-pointer"
            onClick={onClose}
          >
            <MdClose className="h-5 w-5 text-white" />
          </div>
          <div
            className={
              'bg-secondary-500 rounded-full p-1.5 hover:opacity-80 cursor-pointer'
            }
            onClick={handleSubmit}
          >
            <MdCheck className="h-5 w-5 text-white" />
          </div>
        </div>
      </form>
    </div>
  )
}

export default EditLinkItem
