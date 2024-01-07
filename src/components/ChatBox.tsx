"use client"

import { useEffect, useState, useRef } from 'react'
import axios from 'axios'

import { pusherClient } from '@/lib/pusher'
import ChatBubble from '@/components/ChatBubble'
import { Chat } from '@/schemas/chats'
import { Collaboration } from '@/schemas/collaborations'

const ChatBox = (props: { collaboration: Collaboration, userId: string }) => {
    const [chats, setChats] = useState<Chat[]>([])
    const [message, setMessage] = useState<string>("")
    const chatBubbleContainerRef = useRef<HTMLDivElement | null>(null)
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
            if (chat.senderId !== props.userId) {
                setChats(chats => [...chats, chat])
            }
        })
        return () => {
            channel.unbind("chat")
            pusherClient.unsubscribe(props.collaboration.id)
        }
    }, [props.collaboration.id, props.userId])

    useEffect(() => {
        if (chatBubbleContainerRef.current) {
            chatBubbleContainerRef.current.scrollTop = chatBubbleContainerRef.current.scrollHeight
        }
    }, [chats])

    const handleSendMessage = (message: string) => {
        const senderId = props.userId
        const receiverId = props.collaboration.user1.id === props.userId ? props.collaboration.user2.id : props.collaboration.user1.id
        const sendMessage = async () => {
            setMessage("")
            try {
                const res = await axios.post(`api/chats`, {
                    collaborationId: props.collaboration.id,
                    senderId,
                    receiverId,
                    message
                })
                setChats(chats => [...chats, res.data.chat])
            } catch (error) {
                // eslint-disable-next-line no-console
                console.log(error)
            }
        }
        sendMessage()
    }

    return (
        <div className="h-full flex flex-col gap-2">
            <div ref={chatBubbleContainerRef} className='h-[94%] pb-2 px-4 flex flex-col-reverse overflow-auto'>
                {chats.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(chat => (
                    <ChatBubble
                        key={chat.id}
                        {...chat}
                        userId={props.userId}
                    />
                ))}
            </div>
            <div className='mx-4 flex items-center gap-2'>
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