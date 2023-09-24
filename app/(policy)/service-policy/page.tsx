import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <div className="m-auto flex flex-col justify-center items-center gap-8 mt-24">
      <h1 className="text-secondary-800 text-5xl font-bold">服務條款</h1>
      <div className=" text-md text-gray-500 flex flex-col gap-4">
        最後更新日期：2023 / 09 / 25
        <ul className="flex flex-col gap-3">
          <li>
            <p className="text-lg text-gray-700">接受條款</p>
            <p>
              使用我們的服務表示您接受並同意遵守這些條款和條件。如果您不同意這些條款，請不要使用我們的服務。
            </p>
          </li>
          <li>
            <p className="text-lg text-gray-700">使用我們的服務</p>
            <p>
              我們保留隨時修改或中止服務（無論是暫時或永久）的權利，並可能不事先通知。
            </p>
          </li>
          <li>
            <p className="text-lg text-gray-700">服務修改</p>
            <p>
              除非得到您的同意，否則我們不會與第三方分享您的個人資料。但是，我們可能會為了法律目的或合併/購併的需要而分享資料。
            </p>
          </li>
          <li>
            <p className="text-lg text-gray-700">帳戶與安全</p>
            <p>
              為了使用某些服務，您可能需要註冊帳戶。您同意提供真實、準確、最新和完整的資料，並維護和及時更新這些資料。
            </p>
          </li>
          <li>
            <p className="text-lg text-gray-700">終止</p>
            <p>
              我們保留在任何時候，因任何原因終止您的帳戶或使用我們服務的權利。
            </p>
          </li>
          <li>
            <p className="text-lg text-gray-700">免責聲明</p>
            <p>
              我們的服務以「現狀」和「現有」的基礎提供，不提供任何明示或暗示的擔保或保證。
            </p>
          </li>
          <li>
            <p className="text-lg text-gray-700">聯繫我們</p>
            <p>
              如果您對本隱私政策有任何問題或建議，請透過以下方式與我們聯繫：
              <Link
                href="contact-us"
                className=" cursor-pointer hover:underline-offset-1 hover:text-secondary-800"
              >
                聯絡我們
              </Link>
            </p>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Page
