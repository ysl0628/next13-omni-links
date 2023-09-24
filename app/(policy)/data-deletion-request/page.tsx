import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <div className="m-auto flex flex-col justify-center items-center gap-8 mt-24">
      <p className="text-5xl text-secondary-800 font-bold">資料刪除請求</p>
      <div className=" text-md text-gray-500 flex flex-col gap-4">
        最後更新日期：2023 / 09 / 25
        <p className="text-xl">
          如果您希望我們刪除您的資料，請提供您的全名和註冊電子郵件，並透過
          <Link
            href="contact-us"
            className=" cursor-pointer text-primary-500 hover:underline-offset-1 hover:text-secondary-800"
          >
            聯絡我們
          </Link>
          向我們發送請求。
        </p>
      </div>
    </div>
  )
}

export default Page
