'use client'

import React from 'react'
import { z } from 'zod'
import axios, { AxiosResponse } from 'axios'
import { toast } from 'react-hot-toast'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import Selector from '../../../input/Selector'
import LabelInput from '../../../input/LabelInput'
import ButtonLoader from '@/components/ButtonLoader'

import { Link, LinkType } from '@prisma/client'

import useSetup from '@/hooks/useSetup'
import { notifyError } from '@/utils/notify'
import { linkList } from '@/constants/linkMapping'

import { MdClose, MdCheck } from 'react-icons/md'
import { zodResolver } from '@hookform/resolvers/zod'

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
const typeSchema = z
  .object({
    id: z.string(),
    label: z.string()
  })
  .catch({ id: 'default', label: '請選擇' })

const schema = z
  .object({
    id: z.string().nullable(),
    title: z.string().nullable(),
    url: z.string().url('請輸入正確 url 格式').nullable(),
    type: typeSchema,
    order: z.number().int().nullable()
  })
  .superRefine(async (val, ctx) => {
    if (val.type.id === 'website') {
      if (!Boolean(val.title)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '',
          path: ['title'],
          fatal: true
        })
        return z.NEVER
      }
    }
  })

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
  const [isLoading, setIsLoading] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    setError
  } = useForm<FieldValues>({
    defaultValues: {
      id: item?.id || '',
      title: item?.title || '',
      url: item?.url || '',
      type:
        item?.type ||
        (isWebsite
          ? { id: 'website', label: '自訂連結' }
          : { id: 'default', label: '請選擇' }),
      order: item ? index : lastItemOrder + 1
    },
    resolver: zodResolver(schema)
  })

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }

  const handleAddLink = async (values: FormValues) => {
    setIsLoading(true)
    try {
      const { id, ...rest } = values
      const { data: res } = await axios.post<AxiosResponse<Link>>(
        `/api/user/${user?.id}/links`,
        rest
      )

      addLink(res.data)
      toast.success('新增成功')
      onClose && onClose()
    } catch (error: any) {
      if (error.response?.data?.type === 'invalid') {
        toast.error(error.response?.data?.message)
        setError(
          'url',
          {
            type: 'custom',
            message: ''
          },
          {
            shouldFocus: true
          }
        )
        return
      }
      notifyError(error, '新增失敗')
      console.log(error)
      onClose && onClose()
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateLink = async (values: FormValues) => {
    setIsLoading(true)
    const result = {
      url: values.url || '',
      type: values.type,
      title: values.title || '',
      order: values.order
    }

    try {
      const { data: res } = await axios.put<AxiosResponse<Link>>(
        `/api/user/${user?.id}/links/${values.id}`,
        result
      )
      toast.success('更新成功')
      updateLink(res.data?.id, res.data)
      onClose && onClose()
    } catch (error: any) {
      if (error.response?.data?.type === 'invalid') {
        toast.error(error.response?.data?.message)
        setError(
          'url',
          {
            type: 'custom',
            message: ''
          },
          {
            shouldFocus: true
          }
        )
        return
      }
      notifyError(error, '新增失敗')
      console.log(error)
      onClose && onClose()
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const result = {
      ...data,
      type: isWebsite ? websiteOption : data.type,
      title: data.title || data.type?.label
    }
    if (item) {
      handleUpdateLink(result)
    } else {
      handleAddLink(result)
    }
  }

  return (
    <div className="flex w-full justify-between items-center gap-8 shadow-lg p-4 rounded-xl">
      <form onSubmit={handleSubmit(onSubmit)} className="contents">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center gap-2">
            <div className="w-12">{isWebsite ? '名稱' : '類型'}</div>

            {isWebsite ? (
              <div className="flex-auto">
                <LabelInput
                  errors={errors}
                  register={register}
                  id="title"
                  small
                  placeholder="請輸入連結名稱"
                />
              </div>
            ) : (
              <div className="border-2 rounded-lg w-1/3">
                <Selector
                  id="type"
                  value={item?.type || { id: 'default', label: '請選擇' }}
                  control={control}
                  options={linkList}
                  onChange={(value) => setCustomValue('type', value)}
                  error={errors.type?.message as string}
                />
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="w-12 ">連結</div>
            <div className="flex-auto">
              <LabelInput
                errors={errors}
                serverError={errors['url']?.message as string}
                register={register}
                id="url"
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
          <button
            title="submit"
            className={
              'bg-secondary-500 rounded-full p-1.5 hover:opacity-80 cursor-pointer'
            }
            type="submit"
          >
            {isLoading ? (
              <ButtonLoader />
            ) : (
              <MdCheck className="h-5 w-5 text-white" />
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditLinkItem
