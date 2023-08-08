'use client'

import Avatar from '../Avatar'
import Button from '../Button'
import Divider from '../Divider'
import ButtonGroup from '../ButtonGroup'
import LabelInput from '../input/LabelInput'
import LinkItem from './LinkItem'

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

const Settings = () => {
  return (
    <div className="w-full min-w-[25rem] flex md:min-w-[40rem] flex-col py-4 gap-3 bg-white rounded shadow-md md:mx-16 my-12">
      <div className="text-3xl font-semibold px-6 p-2 text-grey-600 divide-y">
        連結設定
      </div>
      <Divider />
      <div className="px-6 py-4 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <LinkItem />
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

export default Settings
