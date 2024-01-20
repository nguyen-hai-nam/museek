import { prisma } from "@/lib/prisma"
import { CreateProfileImageSchema } from "@/schemas/profileImage"

export const getProfileImage = async (id: string) => {
    const role = await prisma.profileImage.findUnique({
        where: {
            id
        }
    })
    return role
}

export const createProfileImage = async (data: CreateProfileImageSchema) => {
    const role = await prisma.profileImage.create({
        data
    })
    return role
}

export const deleteProfileImage = async (id: string) => {
    const role = await prisma.profileImage.delete({
        where: {
            id
        }
    })
    return role
}