'use client'
import React from 'react'
import axios from 'axios'
import { z } from 'zod'
import Image from 'next/image'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import toast from 'react-hot-toast/headless'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import Button from '@/components/Button'
import Input from '@/components/input/Input'

import { AiFillGithub } from 'react-icons/ai'
import { BiLogoGoogle, BiLogoFacebook } from 'react-icons/bi'
import { CALLBACK_URL } from '@/constants/common'

import logo from '@/public/images/logo.svg'

const signUpSchema = z.object({
  username: z
    .string({ required_error: 'Username 為必填欄位' })
    .regex(
      /^[a-zA-Z0-9_]*$/,
      '只能包含英文、數字及底線，不可包含空白及特殊符號'
    ),
  email: z
    .string({ required_error: 'Email 為必填欄位' })
    .email('請輸入正確的 Email'),
  password: z
    .string({ required_error: 'Password 為必填欄位' })
    .min(8, '密碼長度不可小於 8 個字元')
})
const genericFieldsSchema = z.record(z.string(), z.string().nullable())
const unionSchema = z.union([signUpSchema, genericFieldsSchema])

type FieldValues = z.infer<typeof unionSchema>

const SignUpClient = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      username: '',
      email: '',
      password: ''
    },
    resolver: zodResolver(signUpSchema)
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)

    try {
      await axios.post('/api/register', data)
      toast.success('註冊成功')
      router.push('/portal/basic')
    } catch (error) {
      toast.error('註冊失敗')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialSignUp = (socialType: string) => {
    signIn(socialType, {
      callbackUrl: CALLBACK_URL
    }).then((callback) => {
      callback?.ok ? toast.success('註冊成功') : toast.error('註冊失敗')
    })
  }

  return (
    <>
      <div className="flex flex-col gap-4 justify-center items-center my-12">
        <div>
          <Image src={logo} alt="logo" priority />
        </div>
        <h1 className="text-grey-600 text-3xl font-semibold">
          Create Your Account
        </h1>
      </div>
      <div className="flex flex-col gap-6">
        <form className="contents" onSubmit={handleSubmit(onSubmit)}>
          <Input
            register={register}
            id="username"
            errors={errors}
            label="Username"
            className=""
          />
          <Input
            register={register}
            id="email"
            errors={errors}
            label="Email"
            className=""
          />
          <Input
            register={register}
            errors={errors}
            id="password"
            label="Password"
            type="password"
            className=""
          />
          <Button
            label="Sign Up"
            type="submit"
            disabled={isLoading}
            className="w-full"
          />
        </form>
        <div className="text-md text-center text-gray-300 font-light">
          Connect With
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:gap-4 justify-center">
          <Button
            icon={BiLogoGoogle}
            onClick={() => handleSocialSignUp('google')}
            className="w-full"
            color="warning"
          />
          <Button
            icon={BiLogoFacebook}
            onClick={() => handleSocialSignUp('facebook')}
            className="w-full"
            color="info"
          />
          <Button
            icon={AiFillGithub}
            onClick={() => handleSocialSignUp('github')}
            className="w-full"
            color="dark"
          />
        </div>
        <div className="text-md text-center text-gray-300 font-light">
          Already a member?{' '}
          <Link
            className="text-md text-secondary-500 hover:underline hover:underline-offset-4"
            href="/login"
          >
            Log In
          </Link>
        </div>
      </div>
    </>
  )
}

export default SignUpClient
