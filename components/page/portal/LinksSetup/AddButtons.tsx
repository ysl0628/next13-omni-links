'use client'
import { Dispatch, SetStateAction } from 'react'

import useSetup from '@/hooks/useSetup'
import Button from '@/components/ui/Button'

interface AddButtonsProps {
  setLinkType: Dispatch<SetStateAction<'' | 'website' | 'social'>>
}

const AddButtons = ({ setLinkType }: AddButtonsProps) => {
  const links = useSetup((state) => state.links)
  const disabled = links?.length === 8

  return (
    <>
      <Button
        onClick={() => setLinkType('social')}
        label="新增社群連結"
        rounded="full"
        size="large"
        className="w-full"
        disabled={disabled}
      />
      <Button
        onClick={() => setLinkType('website')}
        label="新增自訂連結"
        color="secondary"
        rounded="full"
        size="large"
        className="w-full"
        disabled={disabled}
      />
    </>
  )
}

export default AddButtons
