import { Metadata } from 'next'

interface AdminLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Admin',
  description: 'Setting Your LinkOrchard'
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <section className="w-full h-full flex pt-2.5 bg-grey-50 overflow-auto">
      {children}
    </section>
  )
}
