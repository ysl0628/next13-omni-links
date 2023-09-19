'use client'

import { useRouter } from 'next/navigation'

import Button from '../../Button'

const Descriptions = () => {
  const router = useRouter()

  return (
    <div className="flex flex-col md:max-w-[32rem] max-w-full justify-start gap-[46px]">
      <div className="rounded-[36px] text-xs self-start bg-[#22C55E] text-white px-2 py-0.5">
        NEW
      </div>
      <h1 className=" text-4xl sm:text-5xl md:text-[60px] font-bold leading-tight text-[#2A3342]">
        Branch Out with Link Orchard
      </h1>
      <p className="text-[#556987] text-md sm:text-[20px] leading-loose">
        LinkOrchard，連接的果園。
        <br />
        在這裡種下你的連結，收穫豐富的人脈與機會。
      </p>
      <div className="flex flex-col md:flex-row gap-4">
        <Button
          label="開始我的 LinkOrchard"
          onClick={() => router.push('/portal/basic')}
        />
        <Button
          label="聯絡我們"
          variant="text"
          onClick={() => router.push('/contact-us')}
        />
      </div>
      <p className="text-[#8896AB] text-sm">
        Trusted by brands all around the world
      </p>
    </div>
  )
}

export default Descriptions
