export default function Home() {
  return (
    <section className="h-screen overflow-hidden flex flex-col">
      <div className="h-[95%] w-full pt-[100px] flex flex-col items-center relative bg-[#F7F8F9]">
        <main className="flex h-full flex-col items-center justify-between p-24">
          <div>111</div>
        </main>
        <div
          className="absolute h-[80px] w-full bottom-0 
        before:content-[''] before:block before:absolute 
        before:rounded-tl-[100%] before:rounded-br-[100%] 
        before:rounded-tr-[50%] before:rounded-bl-[50%] before:w-[55%] before:h-full before:translate-x-[83%] before:translate-y-[60%] before:bg-[#ffffff] 
        after:content-[''] after:block after:absolute 
        after:rounded-tl-[100%] after:rounded-br-[100%] 
        after:rounded-tr-[50%] after:rounded-bl-[50%] after:w-[55%] after:h-full after:bg-[#F7F8F9] after:-translate-x-[4%] after:translate-y-[35%] after:-z-[1]"
        ></div>
        {/* </div> */}
      </div>
    </section>
  )
}
