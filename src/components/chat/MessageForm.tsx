"use client"

import { useEffect, useRef } from "react"
import { IoIosSend } from "react-icons/io"

import { handleNewComingMessage, handleSendMessage } from "@/actions/chat"
import { pusherClient } from "@/lib/pusher"

type MessageFormProps = {
    collaborationId: string
    senderId: string
    receiverId: string
}

const MessageForm = (props: MessageFormProps) => {
    const ref = useRef<HTMLFormElement | null>(null)

    useEffect(() => {
        const channel = pusherClient.subscribe(props.collaborationId)
        channel.bind("chat", () => {
            handleNewComingMessage()
        })
        return () => {
            channel.unbind("chat")
            pusherClient.unsubscribe(props.collaborationId)
        }
    }, [props.collaborationId])

    return (
        <form ref={ref} action={
            async (formData) => {
                ref.current?.reset()
                await handleSendMessage(formData)
            }} className='px-4 grow w-full flex items-center gap-2'
        >
            <input type="text" name="collaborationId" value={props.collaborationId} readOnly hidden />
            <input type="text" name="senderId" value={props.senderId} readOnly hidden />
            <input type="text" name="receiverId" value={props.receiverId} readOnly hidden />
            <input
                type="text"
                name="message"
                placeholder="Aa"
                className="input input-sm input-bordered input-primary w-full focus:outline-2 focus:outline-offset-0"
            />
            <button type="submit" className="btn btn-sm btn-primary"><IoIosSend className='text-2xl' /></button>
        </form>
    )
}

export default MessageForm