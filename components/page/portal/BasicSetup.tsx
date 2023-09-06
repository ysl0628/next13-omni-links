'use client'
import axios from 'axios'
import { MouseEvent } from 'react'
import { toast } from 'react-hot-toast'
import { useFormik } from 'formik'

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

interface FormValues {
  customImage?: string | null
  title?: string | null
  description?: string | null
  themeColor?: 'basic' | 'blue-rose' | 'lime' | null
}

const BasicSetup: React.FC<BasicSetupProps> = () => {
  const { update, admin } = useSetup((state) => state)
  const user = useSetup((state) => state.user)

  const formik = useFormik<FormValues>({
    initialValues: { ...admin },
    onSubmit: async (values) => {
      try {
        const { data: res } = await axios.put(`/api/user/${user?.id}`, values)
        update({ admin: res.data })
        toast.success('更新成功')
      } catch (error) {
        toast.error('更新失敗')
        console.log(error)
      }
    }
  })

  const avatarImage = formik.values.customImage || admin?.customImage

  const handlePreview = () => {
    update({ admin: formik.values })
  }

  const handleUpload = (url: string) => {
    formik.setFieldValue('customImage', url)
  }

  const handleResetImg = () => {
    formik.setFieldValue('customImage', admin.customImage)
  }

  return (
    <>
      <div className="text-3xl font-semibold px-6 p-2 text-grey-600 divide-y">
        基本設定
      </div>
      <Divider />
      <form className="contents" onSubmit={formik.handleSubmit}>
        <div className="px-6 pt-6 pb-4 w-full flex justify-between flex-grow items-center md:flex-row flex-col gap-12">
          <Avatar size={150} src={avatarImage} />
          <div className="flex justify-between items-center flex-auto gap-6">
            <ImageUpload
              label="上傳圖片"
              rounded="full"
              size="large"
              className="w-full"
              onChange={(url) => handleUpload(url)}
            />
            <Button
              label="重置圖片"
              variant="outline"
              className="w-full"
              size="large"
              rounded="full"
              onClick={handleResetImg}
            />
          </div>
        </div>
        <div className="px-6 py-4 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <LabelInput
              formik={formik}
              name="title"
              label="標題"
              placeholder="請輸入標題"
            />
            <LabelInput
              formik={formik}
              name="description"
              label="簡介"
              textarea
              placeholder="請輸入用簡介"
            />
            <ButtonGroup
              title="主題色"
              name="themeColor"
              list={themeList}
              formik={formik}
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
          />
        </div>
      </form>
    </>
  )
}

export default BasicSetup
