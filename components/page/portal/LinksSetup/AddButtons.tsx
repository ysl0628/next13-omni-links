'use client'

import Button from '@/components/ui/Button'
import { Dispatch, SetStateAction } from 'react'

interface AddButtonsProps {
  setLinkType: Dispatch<SetStateAction<'' | 'website' | 'social'>>
}

const AddButtons = ({ setLinkType }: AddButtonsProps) => {
  return (
    <>
      <Button
        onClick={() => setLinkType('social')}
        label="新增社群連結"
        rounded="full"
        size="large"
        className="w-full"
      />
      <Button
        onClick={() => setLinkType('website')}
        label="新增自訂連結"
        color="secondary"
        rounded="full"
        size="large"
        className="w-full"
      />
    </>
  )
}

export default AddButtons
