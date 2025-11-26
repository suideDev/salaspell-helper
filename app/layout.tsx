import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SalaSpell Helper',
  description: 'Filter and discover D&D spells by class, level, and source books',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

