import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Almighty MIDGE - BWAAK BWAAAAAAKKKK',
  description: 'Click to worship the holy MIDGE. Build your combo. SUPERCHARGE.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/20260302_164919.jpg',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '20260302_164919.jpg',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
