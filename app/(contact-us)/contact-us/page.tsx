import Link from 'next/link'

export default function PageContactUs() {
  return (
    <div className="m-auto flex flex-col justify-center items-center gap-8">
      <div className="rounded-[36px] text-xs bg-primary-200 text-primary-600 px-2 py-0.5">
        Building
      </div>
      <h2 className=" text-5xl font-bold">網頁建置中</h2>
      <p className=" text-xl text-gray-500">內容尚在建置中，敬請期待。</p>
      <div className="flex gap-4">
        <Link
          href="/"
          className=" px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
        >
          回到首頁
        </Link>
      </div>
    </div>
  )
}
