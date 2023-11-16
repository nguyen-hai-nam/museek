"use client"

import { useState } from "react"
import Link from 'next/link'

interface Tab {
    name: string,
    href: string
}

const tabs: Tab[] = [
    {
        name: 'Current',
        href: '/collaboration'
    },
    {
        name: 'Invitation',
        href: '/collaboration/invitation'
    },
    {
        name: 'Pending',
        href: '/collaboration/pending'
    }
]

export default function CollaborationLayout({
    children,
}: {
  children: React.ReactNode
}) {
    const [activeTab, setActiveTab] = useState(tabs[0])

    const handleClick = (tab: Tab) => {
        setActiveTab(tab)
    }
    
    return (
        <div className="mx-auto w-3/5">
            <div className="my-4 mx-auto w-1/2 tabs tabs-bordered">
                {tabs.map((tab, index) => (
                    <Link
                        href={tab.href}
                        key={index}
                        className={`tab font-semibold ${activeTab === tab ? 'tab-active' : ''}`}
                        onClick={() => handleClick(tab)}
                    >
                        {tab.name}
                    </Link>
                ))}
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}