import type { Metadata } from 'next'
import { Cinzel, MedievalSharp } from 'next/font/google'
import './globals.css'

const cinzel = Cinzel({ 
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
})

const medieval = MedievalSharp({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-medieval',
  display: 'swap',
})

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
    <html lang="en" className={`${cinzel.variable} ${medieval.variable}`}>
      <body>{children}</body>
    </html>
  )
}

