'use client'
import { useFormik } from 'formik'

import Avatar from '../Avatar'
import Button from '../Button'
import Divider from '../Divider'
import ButtonGroup from '../ButtonGroup'
import LabelInput from '../input/LabelInput'

const themeList = [
  {
    name: '基礎色',
    id: 'basic'
  },
  {
    name: '藍綠色',
    id: 'blue-green'
  },
  {
    name: '紅橘色',
    id: 'red-orange'
  }
]

const AdminSettings = () => {
  const formik = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      console.log(values)
    }
  })

  return (
    <div className="w-full min-w-[25rem] flex md:min-w-[40rem] flex-col py-4 gap-3 bg-white rounded shadow-md md:mx-16 my-12">
      <div className="text-3xl font-semibold px-6 p-2 text-grey-600 divide-y">
        基本設定
      </div>
      <Divider />
      <div className="px-6 pt-6 pb-4 w-full flex justify-between flex-grow items-center md:flex-row flex-col gap-12">
        <Avatar size={150} />
        <div className="flex justify-between items-center flex-auto gap-6">
          <Button
            label="上傳圖片"
            rounded="full"
            size="large"
            className="w-full"
            onClick={() => {}}
          />
          <Button
            label="移除圖片"
            variant="outline"
            className="w-full"
            size="large"
            rounded="full"
            onClick={() => {}}
          />
        </div>
      </div>
      <div className="px-6 py-4 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <LabelInput
            formik={formik}
            name="username"
            label="用戶名"
            placeholder="請輸入用戶名"
          />
          <LabelInput
            formik={formik}
            name="description"
            label="簡介"
            textarea
            placeholder="請輸入用簡介"
          />
          <ButtonGroup title="主題色" list={themeList} />
        </div>
      </div>
      <div className="px-6 py-4 flex justify-end">
        <Button
          label="預覽"
          size="large"
          className="w-full md:w-1/4"
          onClick={() => {}}
        />
      </div>
    </div>
  )
}

export default AdminSettings
