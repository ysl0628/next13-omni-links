'use client'
import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import toast from 'react-hot-toast/headless'
import { useRouter } from 'next/navigation'
import { useFormik } from 'formik'

import Button from '@/components/Button'
import Input from '@/components/input/Input'

import { AiFillGithub } from 'react-icons/ai'
import { BiLogoGoogle, BiLogoFacebook } from 'react-icons/bi'
import { CALLBACK_URL } from '@/constants/common'

const SignUpClient = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const formik = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      setIsLoading(true)
      axios
        .post('/api/register', values)
        .then(() => {
          router.push('/setting/basic')
        })
        .catch((err) => {
          toast.error('註冊失敗')
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  })

  const handleSocialSignUp = (socialType: string) => {
    signIn(socialType, {
      callbackUrl: CALLBACK_URL
    }).then((callback) => {
      if (callback?.ok) {
        toast.success('登入成功')
      }

      if (callback?.error) {
        toast.error('登入失敗')
      }
    })
  }

  return (
    <>
      <div className="flex justify-center items-center my-14 mb-16">
        <h1 className="text-grey-600 text-3xl font-semibold">Sign Up</h1>
      </div>
      <div className="flex flex-col gap-6">
        <form className="contents" onSubmit={formik.handleSubmit}>
          <Input
            formik={formik}
            name="username"
            label="Username"
            className=""
          />
          <Input formik={formik} name="email" label="Email" className="" />
          <Input
            formik={formik}
            name="password"
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
