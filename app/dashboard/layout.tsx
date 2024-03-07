import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/ui/global.css'
import { ClerkProvider } from '@clerk/nextjs'
import SideNav from '../ui/sidenav'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
          <SideNav />
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12 bg-gray-950">{children}</div>
      </div>
  )
}
