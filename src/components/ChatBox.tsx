"use client"

import { useEffect, useState } from 'react'
import axios from 'axios'

import { pusherClient } from '@/lib/pusher'
import ChatBubble from '@/components/ChatBubble'
import { Chat } from '@/schemas/chats'
import { Collaboration } from '@/schemas/collaborations'

const ChatBox = (props: { collaboration: Collaboration, userId: string }) => {
    const [chats, setChats] = useState<Chat[]>([])
    const [message, setMessage] = useState<string>("")

    useEffect(() => {
        setChats([])
        const fetchChats = async () => {
            try {
                const res = await axios.get(`api/chats?where={"collaborationId":"${props.collaboration.id}"}&include={"sender":true}`)
                setChats(res.data.chats)
            } catch (error) {
                setChats([])
            }
        }
        fetchChats()
    }, [props.collaboration.id])

    useEffect(() => {
        const channel = pusherClient.subscribe(props.collaboration.id)
        channel.bind("chat", (chat: Chat) => {
            setChats(chats => [...chats, chat])
        })
    }, [props.collaboration.id])

    const handleSendMessage = (message: string) => {
        const senderId = props.userId
        const receiverId = props.collaboration.user1.id === props.userId ? props.collaboration.user2.id : props.collaboration.user1.id
        const sendMessage = async () => {
            await axios.post(`api/chats`, {
                collaborationId: props.collaboration.id,
                senderId,
                receiverId,
                message
            })
        }
        sendMessage()
        setMessage("")
    }

    return (
        <div className="h-full w-full overflow-visible">
            <div className='h-full px-4 flex flex-col-reverse overflow-y-scroll'>
                {chats.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(chat => (
                    <ChatBubble
                        key={chat.id}
                        {...chat}
                        userId={props.userId}
                    />
                ))}
            </div>
            <div className='mt-12 mx-4 flex items-center gap-2'>
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSendMessage(message)
                        }
                    }} 
                    type="text"
                    placeholder="Aa"
                    className="input input-sm input-bordered w-full focus:outline-2 focus:outline-offset-0"
                />
                <button className="btn btn-sm" onClick={() => handleSendMessage(message)}>Send</button>
            </div>
        </div>
    )
}

export default ChatBox