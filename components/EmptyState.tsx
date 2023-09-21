'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import Heading from './ui/Heading'
import Button from './ui/Button'

interface EmptyStateProps {
  title?: string
  subtitle?: string
  showLogin?: boolean
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No exact matches found.',
  subtitle = 'Try changing your search or filter to find more results.',
  showLogin
}) => {
  const router = useRouter()
  return (
    <div
      className="
        h-[60vh]
        flex 
        flex-col 
        gap-2 
        justify-center 
        items-center 
      "
    >
      <Heading title={title} subtitle={subtitle} center />
      <div className="w-48 mt-4">
        {showLogin && (
          <Button
            label="Remove all filters"
            onClick={() => router.push('/login')}
            variant="outline"
          />
        )}
      </div>
    </div>
  )
}

export default EmptyState
