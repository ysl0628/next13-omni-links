import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <div className="m-auto flex flex-col justify-center items-center gap-8 mt-24">
      <h1 className="text-secondary-800 text-5xl font-bold">隱私權政策</h1>
      <div className=" text-md text-gray-500 flex flex-col gap-4">
        最後更新日期：2023 / 09 / 25
        <ul className="flex flex-col gap-3">
          <li>
            <p className="text-lg text-gray-700">收集的資料</p>
            <p>
              我們可能會收集以下類型的資料：姓名、電子郵件地址、電話號碼、地址、登入資料、交易資訊、以及您使用我們服務時的其他相關資料。
            </p>
          </li>
          <li>
            <p className="text-lg text-gray-700">資料的使用方式</p>
            <p>
              我們可能會使用您的資料來處理訂單、回答問題、傳送新聞通訊或行銷資訊、以及改善我們的服務。
            </p>
          </li>
          <li>
            <p className="text-lg text-gray-700">資料的分享</p>
            <p>
              除非得到您的同意，否則我們不會與第三方分享您的個人資料。但是，我們可能會為了法律目的或合併/購併的需要而分享資料。
            </p>
          </li>
          <li>
            <p className="text-lg text-gray-700">Cookie 與追踪技術</p>
            <p>
              我們可能會使用 cookies
              和其他追踪技術來改善使用者體驗和了解我們的網站流量。
            </p>
          </li>
          <li>
            <p className="text-lg text-gray-700">資料的保護</p>
            <p>
              我們使用一系列的安全措施來確保您的資料得到保護，包括加密和防火牆技術。
            </p>
          </li>
          <li>
            <p className="text-lg text-gray-700">更改隱私政策的權利</p>
            <p>
              我們保留隨時更新或更改本隱私政策的權利。任何更改都會在本頁面上更新，並通知所有已註冊的用戶。
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
