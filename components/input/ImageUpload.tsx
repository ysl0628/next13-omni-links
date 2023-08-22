'use client'

import React, { useCallback } from 'react'
import { CldUploadWidget } from 'next-cloudinary'
import Button, { ButtonProps } from '../Button'

declare global {
  var cloudinary: any
}

interface ImageUploadProps extends Omit<ButtonProps, 'onChange'> {
  onChange: (value: string) => void
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, ...props }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url)
    },
    [onChange]
  )
  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="biam6xll"
      options={{
        maxFiles: 1
      }}
    >
      {({ open }) => {
        return <Button onClick={() => open?.()} {...props} />
      }}
    </CldUploadWidget>
  )
}

export default ImageUpload
