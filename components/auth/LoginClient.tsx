'use client'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useFormik } from 'formik'
import { signIn } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import * as Yup from 'yup'

import Button from '@/components/Button'
import Input from '@/components/input/Input'

import { AiFillGithub } from 'react-icons/ai'
import { BiLogoGoogle, BiLogoFacebook } from 'react-icons/bi'

interface FormikValues {
  email?: string
  password?: string
}

const LoginClient = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('請輸入正確的 Email')
      .required('Email 為必填欄位'),
    password: Yup.string().required('Password 為必填欄位')
  })

  const formik = useFormik<FormikValues>({
    initialValues: {},
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      setIsLoading(true)

      signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false
      }).then((callback) => {
        setIsLoading(false)
        if (callback?.ok) {
          toast.success('登入成功')
          router.push('/admin')
        }

        if (callback?.error) {
          toast.error('登入失敗')
        }
      })
    }
  })

  return (
    <>
      <div className="flex justify-center items-center my-14 mb-16">
        <h1 className="text-grey-600 text-3xl font-semibold">Log In</h1>
      </div>
      <div className="flex flex-col gap-6">
        <form className="contents" onSubmit={formik.handleSubmit}>
          <Input formik={formik} name="email" label="Email" className="" />
          <Input
            formik={formik}
            name="password"
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
          <div className="text-md text-center text-gray-300 font-light">
            Connect With
          </div>
          <div className="flex flex-col gap-2 md:flex-row md:gap-4 justify-center">
            <Button
              icon={BiLogoGoogle}
              onClick={() => {}}
              className="w-full"
              color="warning"
            />
            <Button
              icon={BiLogoFacebook}
              onClick={() => {}}
              className="w-full"
              color="info"
            />
            <Button
              icon={AiFillGithub}
              onClick={() => {}}
              className="w-full"
              color="dark"
            />
          </div>
        </form>
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
