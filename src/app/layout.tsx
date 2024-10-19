"use client"

import 'bootstrap-icons/font/bootstrap-icons.css' // Import Bootstrap Icons CSS
import 'bootstrap/dist/css/bootstrap.min.css' // Import bootstrap CSS
import './globals.css'
import { Inter } from 'next/font/google'

import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

import Navbar from '@/components/Navbar/Navbar'

// export const metadata = {
//   title: 'Attendance System',
//   description: 'Face recognition-based attendance system.',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Import bootstrap JS
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js')
  }, [])

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
