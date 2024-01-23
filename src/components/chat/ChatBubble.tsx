"use client"

import { Chat } from '@prisma/client'
import { useState } from 'react'

type ChatBubbleProps = {
    userId: string
    chat: Chat
}

const ChatBubble = (props: ChatBubbleProps) => {
    const [isExtended, setIsExtended] = useState(false)

    const toggleIsExtended = () => setIsExtended(!isExtended)

    return ( 
        <div className={`chat ${props.userId === props.chat.senderId ? 'chat-end' : 'chat-start'}`}>
            <div className={`chat-bubble bg-secondary/25 text-secondary-content cursor-pointer hover:bg-secondary/50`} onClick={toggleIsExtended}>{ props.chat.message }</div>
            {isExtended && <div className="chat-footer opacity-50">Sent</div>}
        </div>
    )
}

export default ChatBubble