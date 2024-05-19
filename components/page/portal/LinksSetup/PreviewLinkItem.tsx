import { LinkType } from '@prisma/client'

interface PreviewLinkItemProps {
  item: {
    id: string
    title: string
    url: string
    type: LinkType
  }
  isWebsite?: boolean
}

const PreviewLinkItem = ({ item, isWebsite }: PreviewLinkItemProps) => {
  return (
    <div className="flex w-full justify-between items-center gap-8 shadow-lg p-4 rounded-xl bg-white max-w-full absolutes">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center gap-2">
          <div className="w-12">{isWebsite ? '名稱' : '類型'}</div>

          <div className="py-1.5 text-grey-500">
            {isWebsite ? item.title : item.type?.label}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-12 ">連結</div>
          <div
            className="py-1.5 text-grey-500 overflow-hidden text-ellipsis xs:max-w-full 2xs:max-w-[200px] max-w-[160px]  whitespace-nowrap "
            title={item.url}
          >
            {item.url}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreviewLinkItem
