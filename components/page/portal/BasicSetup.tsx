'use client'

import { z } from 'zod'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'

import Avatar from '@/components/Avatar'
import Button from '@/components/Button'
import Divider from '@/components/Divider'
import LabelInput from '@/components/input/LabelInput'
import ButtonGroup from '@/components/ButtonGroup'
import ImageUpload from '@/components/input/ImageUpload'

import { SafeUser } from '@/types/safe'
import useSetup from '@/hooks/useSetup'

const themeList = [
  {
    name: '基礎色',
    id: 'basic'
  },
  {
    name: '藍紅色',
    id: 'blue-rose'
  },
  {
    name: '萊姆色',
    id: 'lime'
  }
]

interface BasicSetupProps {
  currentUser?: SafeUser | null
}

const schema = z.object({
  customImage: z.string().url().nullable(),
  title: z.string().nullable(),
  description: z.string().max(300, '字數不可超過 300 字').nullable(),
  themeColor: z.enum(['basic', 'blue-rose', 'lime']).catch('basic')
})
const genericFieldsSchema = z.record(z.string(), z.string().nullable())
const unionSchema = z.union([schema, genericFieldsSchema])

type FormValues = z.infer<typeof unionSchema>

const BasicSetup: React.FC<BasicSetupProps> = () => {
  const { update } = useSetup((state) => state)
  const user = useSetup((state) => state.user)
  const [oldUser] = useState(user)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setValue,
    getValues,
    trigger
  } = useForm<FormValues>({
    defaultValues: {
      customImage: user?.customImage || '',
      title: user?.title || '',
      description: user?.description || '',
      themeColor: user?.themeColor || 'basic'
    },
    resolver: zodResolver(schema)
  })

  const avatarImage = useWatch({
    control,
    name: 'customImage',
    defaultValue: user?.customImage || ''
  })
  const themeColor = useWatch({
    control,
    name: 'themeColor',
    defaultValue: user?.themeColor || 'basic'
  })

  const handlePreview = async () => {
    const result = await trigger()
    if (!result) return

    const basicValues = getValues()
    update({ user: basicValues })
  }

  const handleUpload = (url: string) => {
    setCustomValue('customImage', url)
  }

  const handleResetImg = () => {
    setCustomValue('customImage', user?.customImage)
  }

  const setCustomValue = (id: keyof FormValues, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }

  const onSubmit = async (values: FormValues) => {
    try {
      const { data: res } = await axios.put(`/api/user/${user?.id}`, values)
      update({ user: res.data })
      toast.success('更新成功')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error?.response?.data
        toast.error(message)
        return
      }
      toast.error('更新失敗')
    }
  }

  return (
    <>
      <div className="text-xl sm:text-3xl font-semibold px-6 p-2 text-grey-600 divide-y">
        基本設定
      </div>
      <Divider />
      <form className="contents" onSubmit={handleSubmit(onSubmit)}>
        <div className="px-6 pt-6 pb-4 w-full flex justify-between flex-grow items-center md:flex-row flex-col gap-12">
          <Avatar size={150} src={avatarImage} />
          <div className="flex justify-between items-center flex-auto gap-6">
            <ImageUpload
              label="上傳圖片"
              rounded="full"
              size="large"
              className="w-full"
              type="button"
              onChange={(url) => handleUpload(url)}
            />
            <Button
              label="重置圖片"
              variant="outline"
              className="w-full"
              size="large"
              rounded="full"
              type="button"
              onClick={handleResetImg}
            />
          </div>
        </div>
        <div className="px-6 py-4 flex flex-col gap-4">
          <div className="flex flex-col gap-5">
            <LabelInput
              id="title"
              register={register}
              errors={errors}
              label="標題"
              placeholder="請輸入標題"
            />
            <LabelInput
              id="description"
              register={register}
              errors={errors}
              label="簡介"
              textarea
              max={500}
              placeholder="請輸入用簡介"
            />
            <ButtonGroup
              title="主題色"
              id="themeColor"
              value={themeColor || 'basic'}
              list={themeList}
              onChange={(value) => setCustomValue('themeColor', value)}
            />
          </div>
        </div>

        <div className="px-6 py-4 flex gap-4 justify-end">
          <Button
            label="預覽"
            color="secondary"
            size="large"
            className="w-full md:w-1/4"
            type="button"
            onClick={handlePreview}
          />
          <Button
            label="儲存"
            size="large"
            className="w-full md:w-1/4"
            type="submit"
            disabled={isSubmitting}
          />
        </div>
      </form>
    </>
  )
}

export default BasicSetup
