import { prisma } from "@/lib/prisma"

export const getAllUsers = async () => {
    const users = await prisma.user.findMany()
    return users
}

export const getUser = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    })
    return user
}

export const createUser = async (data: any) => {
    const user = await prisma.user.create({
        data
    })
    return user
}

export const updateUser = async (id: string, data: any) => {
    const user = await prisma.user.update({
        where: {
            id
        },
        data
    })
    return user
}

export const deleteUser = async (id: string) => {
    const user = await prisma.user.delete({
        where: {
            id
        }
    })
    return user
}