import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="m-auto flex flex-col justify-center items-center gap-8">
      <div className="rounded-[36px] text-xs bg-primary-200 text-primary-600 px-2 py-0.5">
        ERROR 404
      </div>
      <h2 className=" text-5xl font-bold">Page not found</h2>
      <p className=" text-xl text-gray-500">
        Something went wrong, so this page is broken.
      </p>
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
