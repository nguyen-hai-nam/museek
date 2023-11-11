import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Museek',
    description: 'Museek',
}

export default function RootLayout({
    children,
}: {
  children: React.ReactNode
}) {
    return (
        <html lang="en" data-theme="cupcake">
            <body className={`px-2 ${inter.className}`}>
                <Header />
                <div className="my-0 h-0 divider"></div> 
                {children}
            </body>
        </html>
    )
}
