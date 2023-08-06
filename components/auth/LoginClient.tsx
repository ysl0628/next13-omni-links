'use client'
import React from 'react'
import Link from 'next/link'

import Button from '@/components/Button'
import Input from '@/components/input/Input'

import { AiFillGithub } from 'react-icons/ai'
import { BiLogoGoogle, BiLogoFacebook } from 'react-icons/bi'

const LoginClient = () => {
  return (
    <>
      <div className="flex justify-center items-center my-14 mb-16">
        <h1 className="text-grey-600 text-3xl font-semibold">Log In</h1>
      </div>
      <div className="flex flex-col gap-6">
        <Input id="email" label="Email" className="" />
        <Input id="password" label="Password" className="" />
        <Button label="Log In" onClick={() => {}} className="w-full" />
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
