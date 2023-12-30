"use client"

import Image from 'next/image'
import { useState } from 'react'

import { Chat } from '@/schemas/chats'

const ChatBubble = (props: Chat & {userId: string}) => {
    const [isExtended, setIsExtended] = useState(false)

    const toggleIsExtended = () => setIsExtended(!isExtended)

    return ( 
        <div className={`chat ${props.userId === props.sender.id ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <Image height={40} width={40} alt="Profile Picture" src="/vercel.svg" />
                </div>
            </div>
            <div className="chat-header">
                <span className="ml-2 text-xs opacity-50">{ (new Date(props.createdAt)).toLocaleString('vi-VN') }</span>
            </div>
            <div className="chat-bubble cursor-pointer hover:bg-opacity-90" onClick={toggleIsExtended}>{ props.message }</div>
            {isExtended && <div className="chat-footer opacity-50">Sent</div>}
        </div>
    )
}

export default ChatBubble