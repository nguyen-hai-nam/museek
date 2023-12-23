import { prisma } from "@/lib/prisma"
import { CreateRoleSchema, UpdateRoleSchema } from "@/schemas/roles"

export const getRoles = async () => {
    const roles = await prisma.role.findMany()
    return roles
}

export const getRole = async (id: string) => {
    const role = await prisma.role.findUnique({
        where: {
            id
        }
    })
    return role
}

export const createRole = async (data: CreateRoleSchema) => {
    const role = await prisma.role.create({
        data
    })
    return role
}

export const updateRole = async (id: string, data: UpdateRoleSchema) => {
    const role = await prisma.role.update({
        where: {
            id
        },
        data
    })
    return role
}

export const deleteRole = async (id: string) => {
    const role = await prisma.role.delete({
        where: {
            id
        }
    })
    return role
}