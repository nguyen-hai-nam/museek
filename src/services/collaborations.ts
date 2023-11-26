import { prisma } from "@/lib/prisma"

export const getAllCollaborations = async () => {
    const collaborations = await prisma.collaboration.findMany()
    return collaborations
}

export const getCollaboration = async (id: string) => {
    const collaboration = await prisma.collaboration.findUnique({
        where: {
            id
        }
    })
    return collaboration
}

export const createCollaboration = async (data: any) => {
    const { userId1, userId2, ...rest } = data
    const collaboration = await prisma.collaboration.create({
        data: {
            user1: { connect: { id: userId1 } },
            user2: { connect: { id: userId2 } },
            ...rest
        }
    })
    return collaboration
}

export const updateCollaboration = async (id: string, data: any) => {
    const collaboration = await prisma.collaboration.update({
        where: {
            id
        },
        data
    })
    return collaboration
}

export const deleteCollaboration = async (id: string) => {
    const collaboration = await prisma.collaboration.delete({
        where: {
            id
        }
    })
    return collaboration
}