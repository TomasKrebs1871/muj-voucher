import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Voucher Analytics — Lipoelastic',
  description: 'Analýza prodeje voucherů Q1 2026',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body className="bg-gray-50 min-h-screen">{children}</body>
    </html>
  )
}
