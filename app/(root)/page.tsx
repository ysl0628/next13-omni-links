import Image from 'next/image'

import cover from '@/public/images/Cover.png'
import Descriptions from '@/components/page/home/Descriptions'

export default function Home() {
  return (
    <div className="h-full w-full pt-16 overflow-hidden">
      <div className="h-[95%] w-full pt-2 flex flex-col items-center relative bg-grey-50">
        <main className="flex h-full absolute items-center justify-between sm:p-24 p-12">
          <Descriptions />
          <div className="hidden lg:block lg:right-[6rem] xl:left-[8rem] relative ">
            <Image
              alt="cover"
              src={cover}
              className="object-cover"
              priority
              placeholder="blur"
            />
          </div>
        </main>
        <div
          className="absolute h-[80px] w-full bottom-0 
        before:content-[''] before:block before:absolute 
        before:rounded-tl-[100%] before:rounded-br-[100%] 
        before:rounded-tr-[50%] before:rounded-bl-[50%] before:w-[55%] before:h-full before:translate-x-[83%] before:translate-y-[60%] before:bg-white 
        after:content-[''] after:block after:absolute 
        after:rounded-tl-[100%] after:rounded-br-[100%] 
        after:rounded-tr-[50%] after:rounded-bl-[50%] after:w-[55%] after:h-full after:bg-grey-50 after:-translate-x-[4%] after:translate-y-[35%] after:-z-[1]"
        ></div>
      </div>
    </div>
  )
}
