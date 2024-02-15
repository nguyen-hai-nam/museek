"use client"

import ChatBubble from '@/components/chat/ChatBubble'
import MessageForm from './MessageForm'
import { pusherClient } from "@/lib/pusher"
import { revalidatePath } from "next/cache"
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Chat } from '@prisma/client'

type ChatBoxProps = {
    userId: string
    collaborationId: string
}

const ChatBox = (props: ChatBoxProps) => {
    const [chats, setChats] = useState<Chat[]>([])
    const [currentCollaboration, setCurrentCollaboration] = useState<any>(null)

    useEffect(() => {
        axios.get(`/api/chats?query={"where":{"collaborationId":"${props.collaborationId}"`).then(res => {
            setChats(res.data)
        }).catch(() => {
            setChats([])
        })
        axios.get(`/api/collaborations/${props.collaborationId}`).then(res => {
            setCurrentCollaboration(res.data)
        }).catch(() => {
            setCurrentCollaboration(null)
        })
    }, [props.collaborationId])

    useEffect(() => {
        const channel = pusherClient.subscribe(props.collaborationId)
        channel.bind("chat", () => {
            revalidatePath('/chat')
        })
        return () => {
            channel.unbind("chat")
            pusherClient.unsubscribe(props.collaborationId)
        }
    }, [props.collaborationId])

    const channel = pusherClient.subscribe(props.collaborationId)
    channel.bind("chat", () => {
        revalidatePath('/chat')
    })

    return (
        <div className="h-full max-h-full flex flex-col gap-2">
            <div className='h-[860px] py-2 px-4 flex flex-col-reverse overflow-auto'>
                {chats.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(chat => (
                    <ChatBubble key={chat.id} chat={chat} userId={props.userId}/>
                ))}
            </div>
            <MessageForm collaborationId={props.collaborationId} senderId={props.userId} receiverId={currentCollaboration?.userId1 === props.userId ? currentCollaboration?.userId2 as string : currentCollaboration?.userId1 as string}/>
        </div>
    )
}

export default ChatBox