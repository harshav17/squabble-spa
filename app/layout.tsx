import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/ui/global.css'
import { ClerkProvider } from '@clerk/nextjs'

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
        <body className="{inter.className} dark">{children}</body>
      </ClerkProvider>
    </html>
  )
}
