import Image from 'next/image'

import Descriptions from '../../../components/Descriptions'
import cover from '@/public/images/cover.png'

export default function Home() {
  return (
    <section className="h-screen overflow-hidden flex flex-col">
      <div className="h-[95%] w-full pt-[3rem] flex flex-col items-center relative bg-grey-50">
        <main className="flex h-full absolute items-center justify-between p-24">
          <Descriptions />
          <div className="hidden lg:block lg:left-[12rem] xl:left-[15rem] relative">
            <Image alt="cover" src={cover} className="object-cover" priority />
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
    </section>
  )
}
