import { linkList } from '@/constants/linkMapping'
import { Listbox, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'

import { FiTrash } from 'react-icons/fi'
import { MdClose, MdCheck, MdEdit } from 'react-icons/md'
import Selector from '../input/Selector'
import LabelInput from '../input/LabelInput'
import { useFormik } from 'formik'

interface EditLinkItemProps {
  item?: {
    id: string
    title: string
    url: string
    type: string
  }
  isCustom?: boolean
  onClose?: () => void
}

const EditLinkItem = ({ item, isCustom, onClose }: EditLinkItemProps) => {
  const [selected, setSelected] = useState(linkList[0].label)

  const formik = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      console.log(values)
    }
  })

  return (
    <div className="flex w-full justify-between items-center gap-8 shadow-lg p-4 rounded-xl">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center gap-2">
          <div className="w-12">{isCustom ? '名稱' : '類型'}</div>

          {isCustom ? (
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
