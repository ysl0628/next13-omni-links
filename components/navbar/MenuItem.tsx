'use client'

interface Props {
  onClick: () => void
  label: string
}

const MenuItem: React.FC<Props> = ({ label, onClick }) => {
  return (
    <div className="-m-3 flex items-center rounded-lg p-3 transition duration-150 ease-in-out hover:bg-gray-50">
      <p className="text-sm font-medium text-gray-900" onClick={onClick}>
        {label}
      </p>
    </div>
  )
}

export default MenuItem
