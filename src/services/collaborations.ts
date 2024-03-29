import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const countCollaborations = async () => {
    const count = await prisma.collaboration.count()
    return count
}

export const getAllCollaborations = async (query: Prisma.CollaborationFindManyArgs) => {
    const collaborations = await prisma.collaboration.findMany(query)
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
    const existingCollaboration = await prisma.collaboration.findFirst({
        where: {
            userId1,
            userId2,
            status: {
                in: ['WAITING', 'IN_PROGRESS']
            }
        }
    })
    if (existingCollaboration) {
        throw new Error('Collaboration already exists')
    }
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