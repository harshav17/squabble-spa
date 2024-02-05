import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/ui/global.css'
import SideNav from '@/app/ui/sidenav'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import SideNav2 from './ui/sidenav2';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | Squabble',
    default: 'Squabble',
  },
  description: 'the easiest way to share expenses with friends and family and stop squabbling about "who owes who".',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-64">
            <SideNav2 />
          </div>
          <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>
        </body>
      </UserProvider>
    </html>
  )
}
