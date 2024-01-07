import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
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
        <ClerkProvider>
            <html lang="en" data-theme="cupcake">
                <body className={`${inter.className} h-screen max-h-screen min-h-screen flex flex-col`}>
                    <Header />
                    <div className="my-0 h-0 divider"></div>
                    <div className='grow overflow-auto'>
                        {children}
                    </div>
                </body>
            </html>
        </ClerkProvider>
    )
}