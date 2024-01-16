import { Prisma } from '@prisma/client'

import { prisma } from "@/lib/prisma"

export const countUsers = async (query: Prisma.UserCountArgs = {}) => {
    const count = await prisma.user.count(query)
    return count
}

export const getAllUsers = async () => {
    const users = await prisma.user.findMany()
    return users
}

export const getUser = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id
        },
        include: {
            roles: {
                include: {
                    role: true
                }
            }
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
    const { roles, ...rest } = data
    const user = await prisma.user.update({
        where: {
            id
        },
        data: {
            ...rest,
            roles: {
                deleteMany: {},
                create: roles?.map((role: any) => ({
                    role: {
                        connect: {
                            id: role.id
                        }
                    }
                }))
            }
        }
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