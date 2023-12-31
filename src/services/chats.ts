import { prisma } from "@/lib/prisma"
import { pusherServer } from "@/lib/pusher"

export const getAllChats = async (where: any, include: any) => {
    const chats = await prisma.chat.findMany({
        where,
        include
    })
    return chats
}

export const getChat = async (id: string) => {
    const chat = await prisma.chat.findUnique({
        where: {
            id
        }
    })
    return chat
}

export const createChat = async (data: any) => {
    const { collaborationId, senderId, receiverId, ...rest } = data
    const chat = await prisma.chat.create({
        data: {
            collaboration: { connect: { id: collaborationId } },
            sender: { connect: { id: senderId } },
            receiver: { connect: { id: receiverId } },
            ...rest
        },
        include: {
            sender: true,
            receiver: true
        }
    })
    pusherServer.trigger(collaborationId, "chat", chat)
    return chat
}

export const updateChat = async (id: string, data: any) => {
    const chat = await prisma.chat.update({
        where: {
            id
        },
        data
    })
    return chat
}

export const deleteChat = async (id: string) => {
    const chat = await prisma.chat.delete({
        where: {
            id
        }
    })
    return chat
}