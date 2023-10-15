'use client'

import React, { FC, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import axios from 'axios'
import toast from 'react-hot-toast'

import Button from '@/components/ui/Button'
import LabelText from '@/components/ui/LabelText'
import LabelInput from '@/components/input/LabelInput'
import DialogComponent from '@/components/ui/Dialog'

import useSetup from '@/hooks/useSetup'

interface EditUsernameProps {
  userId?: string
  username: string
}

const schema = z.object({
  username: z
    .string()
    .max(20)
    .min(3)
    .regex(
      /^[a-zA-Z0-9_]*$/,
      '只能包含英文、數字及底線，不可包含空白及特殊符號'
    )
})

const EditUsername: FC<EditUsernameProps> = ({ userId, username }) => {
  const update = useSetup((state) => state.update)
  const user = useSetup((state) => state.user)
  const [isOpen, setIsOpen] = useState(false)
  const [serverError, setServerError] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      username: ''
    },
    resolver: zodResolver(schema)
  })

  function closeModal() {
    setIsOpen(false)
    setServerError(null)
    reset()
  }

  function openModal() {
    setIsOpen(true)
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const { data: res } = await axios.put(`/api/user/${userId}`, data)
      const updatedUser = { username: res.data.username }

      update({ user: updatedUser })
      toast.success('註冊成功')
      closeModal()
    } catch (error: any) {
      const { data } = error.response

      if (data === '此使用者名稱已被使用') {
        setServerError(data)
      }
    }
  }

  return (
    <div className="flex flex-col gap-3 px-6 py-2">
      <LabelText label="用戶名" text={user?.username || username} />
      <div className="md:w-[6rem] w-full">
        <Button onClick={openModal} label="修改" fullWidth />
      </div>
      <DialogComponent
        isOpen={isOpen}
        title="修改用戶名"
        submitLabel="確認修改"
        onClose={closeModal}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mt-4 flex flex-col gap-4">
          <div className="w-full flex flex-col gap-2">
            <label className="text-md text-gray-600 ">原用戶名</label>
            <input
              disabled
              placeholder=""
              title="username"
              value={user?.username || username}
              className="h-12 p-4 input-base bg-gray-300 border border-gray-300 text-gray-500"
            />
          </div>
          <LabelInput
            id="username"
            register={register}
            errors={errors}
            serverError={serverError}
            label="修改為"
            placeholder="請輸入新的用戶名"
          />
        </div>
      </DialogComponent>
    </div>
  )
}

export default EditUsername
