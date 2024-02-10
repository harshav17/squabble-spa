import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/ui/global.css'
import SideNav2 from './ui/sidenav2';
import { ClerkProvider } from '@clerk/nextjs'
import SideNav from './ui/sidenav';

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
      <ClerkProvider>
        <body className={inter.className}>
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-64">
            <SideNav />
          </div>
          <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>
        </body>
      </ClerkProvider>
    </html>
  )
}
