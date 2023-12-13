'use client'
import React from 'react'
import { z } from 'zod'
import Link from 'next/link'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import { SubmitHandler, useForm } from 'react-hook-form'

import Button from '@/components/ui/Button'
import Input from '@/components/input/Input'

import { AiFillGithub } from 'react-icons/ai'
import { BiLogoGoogle, BiLogoFacebook, BiLogoTwitter } from 'react-icons/bi'
import { CALLBACK_URL } from '@/constants/common'

import logo from '@/public/images/logo.svg'

interface FormikValues {
  email?: string
  password?: string
}

const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email 為必填欄位' })
    .email('請輸入正確的 Email'),
  password: z.string({ required_error: 'Password 為必填欄位' })
})
const genericFieldsSchema = z.record(z.string(), z.string().nullable())
const unionSchema = z.union([loginSchema, genericFieldsSchema])

type FieldValues = z.infer<typeof unionSchema>

const LoginClient = () => {
  const [isLoading, setIsLoading] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (values) => {
    setIsLoading(true)

    signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: true,
      callbackUrl: CALLBACK_URL
    })
      .then((callback) => {
        setIsLoading(false)
        const errorMessage =
          callback?.error === 'Invalid credentials' && '帳號或密碼錯誤'
        callback?.error
          ? toast.error(errorMessage || '登入失敗')
          : toast.success('登入成功')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleSocialLogIn = async (socialType: string) => {
    setIsLoading(true)
    try {
      await signIn(socialType, {
        callbackUrl: CALLBACK_URL
      })
      toast.success('登入成功')
    } catch (error) {
      toast.error('登入失敗')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center gap-6 items-center my-12">
        <div>
          <Image src={logo} alt="logo" priority />
        </div>
        <h1 className="text-grey-600 text-3xl font-semibold">Welcome Back !</h1>
      </div>
      <div className="flex flex-col gap-6">
        <form className="contents" onSubmit={handleSubmit(onSubmit)}>
          <Input
            register={register}
            id="email"
            label="Email"
            errors={errors}
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
            label="Log In"
            type="submit"
            className="w-full"
            disabled={isLoading}
          />
        </form>
        <div className="text-md text-center text-gray-300 font-light">
          Connect With
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:gap-4 justify-center">
          <Button
            icon={BiLogoGoogle}
            onClick={() => handleSocialLogIn('google')}
            className="w-full"
            color="warning"
          />
          <Button
            icon={BiLogoFacebook}
            onClick={() => handleSocialLogIn('facebook')}
            className="w-full"
            color="info"
          />
          <Button
            icon={AiFillGithub}
            onClick={() => handleSocialLogIn('github')}
            className="w-full"
            color="dark"
          />
        </div>
        <div className="text-md text-center text-gray-300 font-light">
          Not a member yet?{' '}
          <Link
            className="text-md text-secondary-500 hover:underline hover:underline-offset-4"
            href="/signup"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </>
  )
}

export default LoginClient
