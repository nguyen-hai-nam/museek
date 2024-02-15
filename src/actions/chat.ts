"use server"

import { prisma } from "@/lib/prisma"
import { pusherServer } from "@/lib/pusher"
import { revalidatePath } from "next/cache"

export const handleSendMessage = async (formData: FormData) => {
    const collaborationId = formData.get('collaborationId') as string
    const senderId = formData.get('senderId') as string
    const receiverId = formData.get('receiverId') as string
    const message = formData.get('message') as string
    const res = await prisma.chat.create({
        data: {
            message,
            collaborationId,
            senderId,
            receiverId
        }
    })
    pusherServer.trigger(collaborationId, "chat", res)
    revalidatePath('/chat')
}

export const handleNewComingMessage = async () => {
    revalidatePath('/chat')
}