"use client"

import Image from 'next/image'
import { useState } from 'react'

const ChatBubble = ({ sender, message, sentAt } : { sender: { id: string; name: string; avatarUrl: string }; message: string; sentAt: Date }) => {
    const currentUserId = "1"
    const [isExtended, setIsExtended] = useState(false)

    const toggleIsExtended = () => setIsExtended(!isExtended)

    return ( 
        <div className={`chat ${currentUserId === sender.id ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <Image height={40} width={40} alt="Profile Picture" src="/vercel.svg" />
                </div>
            </div>
            <div className="chat-header">
                { sender.name }
                <span className="ml-2 text-xs opacity-50">{ sentAt.toUTCString() }</span>
            </div>
            <div className="chat-bubble cursor-pointer hover:bg-opacity-90" onClick={toggleIsExtended}>{ message }</div>
            {isExtended && <div className="chat-footer opacity-50">
                Sent
            </div>}
        </div>
    )
}

export default ChatBubble