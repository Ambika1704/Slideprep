import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: 'AI PPT Maker - Generate Presentations with AI',
  description: 'Create professional presentations in seconds using AI-powered generation',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
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
      <body className="font-sans antialiased text-foreground min-h-screen overflow-x-hidden relative">
        {/* Premium gradient background */}
        <div className="fixed inset-0 -z-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[#EDE9FE] via-[#F0F9FF] to-[#ECFEFF]" />
        </div>

        {/* Radial glow effects in corners */}
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl opacity-50" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl opacity-50" />
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-300/10 rounded-full blur-3xl opacity-40" />
        </div>

        {children}
        <Analytics />
      </body>
    </html>
  )
}
